import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ProjectWorkspace, ProjectAction, INITIAL_WORKSPACES } from '../data/projectsData';
import { renumberAndOrganizeActions } from '../utils/actionUtils';

// 1. Inicialização do Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Conexão ao Firestore considerando o firestoreDatabaseId provisionado
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// 3. Autenticação anônima para acesso transparente e imediato sem login
export const auth = getAuth(app);
signInAnonymously(auth).catch((err) => {
  console.warn('Conexão anônima Firebase:', err?.message || err);
});

// Teste de conexão conforme boas práticas do Firebase
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_health', 'ping'));
    return true;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (errorMsg.includes('the client is offline')) {
      console.warn('Cliente Firestore operando em modo offline.');
      return false;
    }
    return true;
  }
}

const WORKSPACES_COLLECTION = 'workspaces';

/**
 * Se a nuvem estiver vazia, migra automaticamente os dados existentes (do localStorage ou padrão)
 * para o Firestore, garantindo zero perda de histórico e ações cadastradas.
 */
export async function ensureWorkspacesSeeded(initialFallback: ProjectWorkspace[]): Promise<void> {
  try {
    const colRef = collection(db, WORKSPACES_COLLECTION);
    const snap = await getDocs(colRef);
    
    if (snap.empty) {
      console.log('Coleção online vazia. Iniciando migração automática para a nuvem...');
      const toSeed = initialFallback.length > 0 ? initialFallback : INITIAL_WORKSPACES;
      
      const batchPromises = toSeed.map(ws => {
        const cleanWs: ProjectWorkspace = {
          ...ws,
          actions: renumberAndOrganizeActions(ws.actions || [])
        };
        return setDoc(doc(db, WORKSPACES_COLLECTION, ws.id), cleanWs);
      });

      await Promise.all(batchPromises);
      console.log('Migração para a nuvem concluída com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao verificar/migrar dados para o Firestore:', error);
  }
}

/**
 * Inscreve um listener em tempo real para todos os painéis e ações no Firestore.
 * Qualquer alteração realizada por qualquer usuário será imediatamente emitida pelo callback.
 */
export function subscribeToWorkspaces(
  onUpdate: (workspaces: ProjectWorkspace[]) => void,
  onError?: (error: Error) => void
): () => void {
  const colRef = collection(db, WORKSPACES_COLLECTION);

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate([]);
        return;
      }

      const list: ProjectWorkspace[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ProjectWorkspace;
        list.push({
          ...data,
          id: docSnap.id,
          actions: renumberAndOrganizeActions(data.actions || [])
        });
      });

      // Ordenar para manter prioridade dos painéis padrão se existirem
      list.sort((a, b) => {
        const orderPriority = ['projetos-estrategicos', 'receitas-internas', 'exames'];
        const idxA = orderPriority.indexOf(a.id);
        const idxB = orderPriority.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.title.localeCompare(b.title);
      });

      onUpdate(list);
    },
    (error) => {
      console.error('Erro no listener em tempo real do Firestore:', error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
}

/**
 * Atualiza atomicamente a lista de ações de um painel específico no Firestore.
 */
export async function syncWorkspaceActions(
  workspaceId: string, 
  actions: ProjectAction[]
): Promise<void> {
  const wsRef = doc(db, WORKSPACES_COLLECTION, workspaceId);
  const organized = renumberAndOrganizeActions(actions);
  
  await updateDoc(wsRef, {
    actions: organized,
    updatedAt: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  });
}

/**
 * Cria ou salva um novo painel completo no Firestore.
 */
export async function syncSaveWorkspace(workspace: ProjectWorkspace): Promise<void> {
  const wsRef = doc(db, WORKSPACES_COLLECTION, workspace.id);
  const cleanWs: ProjectWorkspace = {
    ...workspace,
    actions: renumberAndOrganizeActions(workspace.actions || [])
  };
  await setDoc(wsRef, cleanWs, { merge: true });
}
