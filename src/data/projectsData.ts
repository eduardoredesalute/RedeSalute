export interface ProjectAction {
  id: string;
  pilar: string;
  pilarCategoria: string;
  acao: string;
  responsavel: 'Raquel' | 'Eduardo' | 'Karina' | 'Fabiano' | 'Erno' | 'Marcyo' | string;
  dataInicio: string;
  prazo: string;
  como: string;
  status: 'Finalizado' | 'Em andamento' | 'Não iniciado' | 'Sistêmico';
  progresso: number;
  prioridade?: 'Alta' | 'Média' | 'Normal';
  notas?: string;
  unidadeOuParceiro?: string;
}

export const INITIAL_PROJECTS: ProjectAction[] = [
  // --- PILAR 1: CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO ---
  {
    id: "act-01",
    pilar: "CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO",
    pilarCategoria: "Inteligência de Mercado",
    acao: "Mapear cidades onde estamos inseridos - Gravataí",
    responsavel: "Raquel",
    dataInicio: "02/09",
    prazo: "02/09",
    como: "Gravataí: Milenarium, Solaris, Sermeg, Docctor Med",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Gravataí"
  },
  {
    id: "act-02",
    pilar: "CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO",
    pilarCategoria: "Inteligência de Mercado",
    acao: "Mapear cidades onde estamos inseridos - Canoas",
    responsavel: "Raquel",
    dataInicio: "19/10",
    prazo: "21/10",
    como: "Canoas: Clinilife, Ideal Clinicas, Clinicare, Medical, Acertmed, Psique",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Canoas"
  },
  {
    id: "act-03",
    pilar: "CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO",
    pilarCategoria: "Inteligência de Mercado",
    acao: "Mapear cidades onde estamos inseridos - Alvorada",
    responsavel: "Raquel",
    dataInicio: "25/09",
    prazo: "30/09",
    como: "Alvorada: Policlínica Alvorada, Central de Consultas Alvorada, Mais Saúde, S.O.S. Consultas Médicas, AmorSaúde Alvorada, Clinica Ellos e Plasma",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Alvorada"
  },
  {
    id: "act-04",
    pilar: "CLÍNICAS CONCORRENTES - BUSCA ATIVA PELA INTERNET OU IN LOCO",
    pilarCategoria: "Inteligência de Mercado",
    acao: "Mapear cidades onde estamos inseridos - Cachoeirinha",
    responsavel: "Raquel",
    dataInicio: "22/10",
    prazo: "04/11",
    como: "Cachoeirinha:",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Média",
    unidadeOuParceiro: "Cachoeirinha"
  },

  // --- PILAR 2: COREME / PRECEPTORES UNIV. - VISITA E ENTREGA DE MATERIAL IMPRESSO ---
  {
    id: "act-05",
    pilar: "COREME / PRECEPTORES UNIV. - VISITA E ENTREGA DE MATERIAL IMPRESSO",
    pilarCategoria: "Formação & Residências",
    acao: "Visitas presenciais aos COREMEs das universidades para falar da Salute",
    responsavel: "Raquel",
    dataInicio: "01/10",
    prazo: "31/10",
    como: "Visitas presenciais aos COREMEs das universidades para falar da Salute e entregar material de apresentação para contratação de médicos que estão finalizando as residências. 4 instituições, Santa Casa, Hosp Conceição, Hosp Presidente Vargas e PUCRS. Hops. Clínicas - c/ Erno. Hosp Conceição: 27/10 14hs com Dr Gabriel, representante dos residentes. Demais ainda sem retorno de data.",
    status: "Em andamento",
    progresso: 50,
    prioridade: "Alta",
    unidadeOuParceiro: "Universidades / COREMEs"
  },
  {
    id: "act-06",
    pilar: "COREME / PRECEPTORES UNIV. - VISITA E ENTREGA DE MATERIAL IMPRESSO",
    pilarCategoria: "Formação & Residências",
    acao: "Confecção de material de apresentação para COREMEs e reuniões com preceptores",
    responsavel: "Raquel",
    dataInicio: "23/09",
    prazo: "08/10",
    como: "Material em confecção, acordado de apresentar na reunião do dia 28/09 para o Dr Erno. Acordado fazer alguns ajustes. Ajustes finalizados, acordado imprimir 100 Flyers.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Diretoria Médica"
  },
  {
    id: "act-07",
    pilar: "COREME / PRECEPTORES UNIV. - VISITA E ENTREGA DE MATERIAL IMPRESSO",
    pilarCategoria: "Formação & Residências",
    acao: "Marcar as visitas às instituições",
    responsavel: "Raquel",
    dataInicio: "01/10",
    prazo: "31/10",
    como: "Marcar as visitas as instituições",
    status: "Em andamento",
    progresso: 50,
    prioridade: "Alta",
    unidadeOuParceiro: "Instituições"
  },

  // --- PILAR 3: EVENTOS - MAPEAR E ESTAR PRESENTE NOS PRINCIPAIS EVENTOS DE SAÚDE ---
  {
    id: "act-08",
    pilar: "EVENTOS - MAPEAR E ESTAR PRESENTE NOS PRINCIPAIS EVENTOS DE SAÚDE",
    pilarCategoria: "Eventos & Prospecção",
    acao: "Ter calendário de eventos em POA e Região Metropolitana para prospecção de profissionais",
    responsavel: "Raquel",
    dataInicio: "A definir",
    prazo: "A definir",
    como: "Buscar junto a entidades, como AMRIGS, CRM, Organizadora de Eventos de médicos (Alex), Escolas de capacitação (Gustavo - Educare). Parceria com Representantes de Laboratórios buscando a agenda de eventos.",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Média",
    unidadeOuParceiro: "POA e Região Metropolitana"
  },

  // --- PILAR 4: EX CORPO CLÍNCO - BUSCAR PROFISSIONAIS QUE JÁ ATENDERAM NA SALUTE ---
  {
    id: "act-09",
    pilar: "EX CORPO CLÍNCO - BUSCAR PROFISSIONAIS QUE JÁ ATENDERAM NA SALUTE",
    pilarCategoria: "Reativação de Corpo Clínico",
    acao: "Listar banco médico pelo RealClinic e filtrar ex-profissionais sem restrições",
    responsavel: "Karina",
    dataInicio: "25/09",
    prazo: "29/09",
    como: "Listar banco médico pelo RealClinic e montar a lista dos ex profissionais que não temos restrições de voltar para Salute",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "RealClinic"
  },
  {
    id: "act-10",
    pilar: "EX CORPO CLÍNCO - BUSCAR PROFISSIONAIS QUE JÁ ATENDERAM NA SALUTE",
    pilarCategoria: "Reativação de Corpo Clínico",
    acao: "Subir listagem dos ex-profissionais e ativos para o novo CRM",
    responsavel: "Eduardo",
    dataInicio: "01/10",
    prazo: "10/10",
    como: "Subir a listagem dos ex profissionais para o novo CRM e também a listagem dos ativos.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "CRM"
  },
  {
    id: "act-11",
    pilar: "EX CORPO CLÍNCO - BUSCAR PROFISSIONAIS QUE JÁ ATENDERAM NA SALUTE",
    pilarCategoria: "Reativação de Corpo Clínico",
    acao: "Ajustar lista de Ativos com informações completas (BirdID, Vidas, Contrato, Endereço, CNPJ)",
    responsavel: "Raquel",
    dataInicio: "15/10",
    prazo: "22/10",
    como: "Ajustar lista de Ativos com informações completas (BirdID, Vidas, Contrato, Endereço, CNPJ.",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Alta",
    unidadeOuParceiro: "Contratos / Ativos"
  },

  // --- PILAR 5: GRUPOS WPP - DIVULGAÇÃO DAS VAGAS NOS GRUPOS DAS ESPECIALIDADES, NOS REGIONAIS E A NÍVEL BRASIL ---
  {
    id: "act-12",
    pilar: "GRUPOS WPP - DIVULGAÇÃO DAS VAGAS NOS GRUPOS DAS ESPECIALIDADES, NOS REGIONAIS E A NÍVEL BRASIL",
    pilarCategoria: "Divulgação Digital & WhatsApp",
    acao: "Montar novo material para divulgação nos grupos de WhatsApp e impulsionamento",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "26/10",
    como: "Montar novo material para divulgação nos grupos e de impulsionamento. Ajustar material e mensagem para divulgação.",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Alta",
    unidadeOuParceiro: "WhatsApp"
  },
  {
    id: "act-13",
    pilar: "GRUPOS WPP - DIVULGAÇÃO DAS VAGAS NOS GRUPOS DAS ESPECIALIDADES, NOS REGIONAIS E A NÍVEL BRASIL",
    pilarCategoria: "Divulgação Digital & WhatsApp",
    acao: "Mapear as necessidades de vagas da semana nas reuniões de quinta-feira",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "Semanal",
    como: "Mapear as necessidades da semana. Mapeado nas reuniões de quinta-feira.",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Reuniões de Quinta-feira"
  },
  {
    id: "act-14",
    pilar: "GRUPOS WPP - DIVULGAÇÃO DAS VAGAS NOS GRUPOS DAS ESPECIALIDADES, NOS REGIONAIS E A NÍVEL BRASIL",
    pilarCategoria: "Divulgação Digital & WhatsApp",
    acao: "Divulgar semanalmente nos grupos as necessidades mapeadas",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "Semanal",
    como: "Divulgar semanalmente nos grupos as necessidades",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "WhatsApp Especialidades"
  },
  {
    id: "act-15",
    pilar: "GRUPOS WPP - DIVULGAÇÃO DAS VAGAS NOS GRUPOS DAS ESPECIALIDADES, NOS REGIONAIS E A NÍVEL BRASIL",
    pilarCategoria: "Divulgação Digital & WhatsApp",
    acao: "Calendário semanal de comunicação nos grupos (envio toda segunda-feira)",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Ter calendário semanal de comunidação nestes grupos. Identificar qual dia mais estratégico. Acordado envio toda a segunda-feira.",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "WhatsApp"
  },

  // --- PILAR 6: PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA ---
  {
    id: "act-16",
    pilar: "PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA",
    pilarCategoria: "Programa de Indicação",
    acao: "Interna: Definir frequência dos canais de divulgação (diretoria médica, odonto, fisios, gestores)",
    responsavel: "Raquel",
    dataInicio: "05/10",
    prazo: "08/10",
    como: "Interna: Definir a frequência os canais de divulgação, grupo diretoria médica, odonto, fisios, grupo gestores.",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Alta",
    unidadeOuParceiro: "Canais Internos"
  },
  {
    id: "act-17",
    pilar: "PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA",
    pilarCategoria: "Programa de Indicação",
    acao: "Interna: Montar material para divulgação interna destacando o prêmio",
    responsavel: "Raquel",
    dataInicio: "05/10",
    prazo: "26/10",
    como: "Interna: Montar material para divulgação interna, falando do prêmio. Acordado alguns ajustes no material.",
    status: "Em andamento",
    progresso: 50,
    prioridade: "Alta",
    unidadeOuParceiro: "Endomarketing"
  },
  {
    id: "act-18",
    pilar: "PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA",
    pilarCategoria: "Programa de Indicação",
    acao: "Interna: Objetivos de indicação gerados na reunião de Agendas",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "Semanal",
    como: "Interna: Objetivos são gerados na reunião de Agendas (qui)",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Normal",
    unidadeOuParceiro: "Reunião de Agendas"
  },
  {
    id: "act-19",
    pilar: "PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA",
    pilarCategoria: "Programa de Indicação",
    acao: "Externa: Enviar necessidades para Recrutadores externos (Juliana/Leonardo)",
    responsavel: "Erno",
    dataInicio: "28/09",
    prazo: "Semanal",
    como: "Externa: Enviar as necessidades para Recrutadores (Juliana/Leonardo). Enviado semanalmente, após reunião e definições com a diretoria nas quintas-feiras.",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Recrutadores Externos"
  },
  {
    id: "act-20",
    pilar: "PROGRAMA DE INDICAÇÃO INTERNA/EXTERNA",
    pilarCategoria: "Programa de Indicação",
    acao: "Definição e alinhamento dos valores de premiação do programa de indicação",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "24/09",
    como: "Valores de premiação definidos: Médicos R$ 1.000,00; Terapeutas R$ 500,00; Representantes de Laboratórios R$ 500,00; Escalistas e funcionários Salute R$ 350,00; Líderes das unidades e equipe ligada a prospecção não recebe prêmio.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Diretoria Salute"
  },

  // --- PILAR 7: INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING ---
  {
    id: "act-21",
    pilar: "INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING",
    pilarCategoria: "Marketing Digital & Social Media",
    acao: "Analisar junto ao Marketing espaço de publicação no Instagram da Salute",
    responsavel: "Raquel",
    dataInicio: "25/09",
    prazo: "25/09",
    como: "Analisar junto ao marketing espaço de publicação no Instagram da Salute. Conversa com Ricardo (marketing) para orientações e oportunidades.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Marketing / Ricardo"
  },
  {
    id: "act-22",
    pilar: "INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING",
    pilarCategoria: "Marketing Digital & Social Media",
    acao: "Verificar custos para publicações e impulsionamento no Instagram",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Verificar custos para publicações e impulsionamento. Acordado não impulsionar no momento. Fazer publicação de Stories, Feed e incluir nos Destaques, ações sem custo.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Normal",
    unidadeOuParceiro: "Instagram Salute"
  },
  {
    id: "act-23",
    pilar: "INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING",
    pilarCategoria: "Marketing Digital & Social Media",
    acao: "Montar material institucional para publicação no Instagram",
    responsavel: "Raquel",
    dataInicio: "05/10",
    prazo: "08/10",
    como: "Montar material para publicação",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Alta",
    unidadeOuParceiro: "Marketing"
  },
  {
    id: "act-24",
    pilar: "INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING",
    pilarCategoria: "Marketing Digital & Social Media",
    acao: "Definir periodicidade das publicações no Feed e Stories",
    responsavel: "Raquel",
    dataInicio: "30/09",
    prazo: "02/10",
    como: "Definir periodicidade das publicações. Feed: Mensal. Stories: Semanal, nas sextas-feiras",
    status: "Em andamento",
    progresso: 70,
    prioridade: "Normal",
    unidadeOuParceiro: "Marketing"
  },
  {
    id: "act-25",
    pilar: "INSTAGRAM - PUBLICAÇÃO DE VAGAS E DE POSTS REFERENTE A CONTRAÇÃO DE MÉDICOS JUNTO AO MARKETING",
    pilarCategoria: "Marketing Digital & Social Media",
    acao: "Iniciar Stories semanais no Instagram",
    responsavel: "Raquel",
    dataInicio: "25/09",
    prazo: "03/11",
    como: "Iniciar Storie semanais no Instangram",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Alta",
    unidadeOuParceiro: "Instagram Salute"
  },

  // --- PILAR 8: LABORATÓRIOS - APROXIMAÇÃO DOS REPRESENTANTES DE LABORATÓRIOS PARA INDICAÇÃO DE PROFISISONAIS ---
  {
    id: "act-26",
    pilar: "LABORATÓRIOS - APROXIMAÇÃO DOS REPRESENTANTES DE LABORATÓRIOS PARA INDICAÇÃO DE PROFISISONAIS",
    pilarCategoria: "Parcerias & Laboratórios",
    acao: "Aproximação dos contatos Gerenciais dos Representantes Atuais",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Aproximação dos contatos Gerenciais dos Representantes Atuais. Buscar quem são os líderes dos laboratórios.",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Alta",
    unidadeOuParceiro: "Laboratórios Parceiros"
  },
  {
    id: "act-27",
    pilar: "LABORATÓRIOS - APROXIMAÇÃO DOS REPRESENTANTES DE LABORATÓRIOS PARA INDICAÇÃO DE PROFISISONAIS",
    pilarCategoria: "Parcerias & Laboratórios",
    acao: "Apresentar programa de indicações para Representantes de Laboratórios",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Apresentar programa de indicações",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Alta",
    unidadeOuParceiro: "Representantes"
  },

  // --- PILAR 9: LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS) ---
  {
    id: "act-28",
    pilar: "LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS)",
    pilarCategoria: "Recrutamento & LinkedIn",
    acao: "Mapear alcance, custos e estatísticas da plataforma LinkedIn para divulgação",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Ter conhecimento total da plataforma para divulgação, estatísticas (alcance, custos). Custos e demais informações apresentado em reunião.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "LinkedIn"
  },
  {
    id: "act-29",
    pilar: "LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS)",
    pilarCategoria: "Recrutamento & LinkedIn",
    acao: "Verificar custos e aprovação para impulsionamento pela Página da Salute",
    responsavel: "Fabiano",
    dataInicio: "28/09",
    prazo: "28/09",
    como: "Verificar custos para publicações e impulsionamento pela Página da Salute. Custos verificados, Fabiano fará aprovação de R$ 500,00 para teste, com o Gabriel. Liberado, impulsionar a vaga.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Financeiro / Gabriel"
  },
  {
    id: "act-30",
    pilar: "LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS)",
    pilarCategoria: "Recrutamento & LinkedIn",
    acao: "Definir periodicidade das publicações de vagas no LinkedIn",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "08/10",
    como: "Definir periodicidade das publicações. Será feito teste inicial para demais definições.",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Normal",
    unidadeOuParceiro: "LinkedIn"
  },
  {
    id: "act-31",
    pilar: "LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS)",
    pilarCategoria: "Recrutamento & LinkedIn",
    acao: "Montar material institucional para publicação no LinkedIn",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "08/10",
    como: "Montar material para publicação.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "LinkedIn / Marketing"
  },
  {
    id: "act-32",
    pilar: "LINKEDIN - DIVULGAÇÃO DE VAGAS (BUSCAR VALOR E PLANOS PARA IMPULSIONAR AS VAGAS)",
    pilarCategoria: "Recrutamento & LinkedIn",
    acao: "Iniciar publicações de vagas no LinkedIn",
    responsavel: "Raquel",
    dataInicio: "28/09",
    prazo: "20/10",
    como: "Iniciar publicações no Linkedin",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "LinkedIn"
  },

  // --- PILAR 10: PLATAFORMA DE CAPTAÇÃO DE MÉDICOS ---
  {
    id: "act-33",
    pilar: "PLATAFORMA DE CAPTAÇÃO DE MÉDICOS",
    pilarCategoria: "Plataformas de Recrutamento",
    acao: "Conhecer a plataforma Sinaxys e validar período teste",
    responsavel: "Raquel",
    dataInicio: "22/09",
    prazo: "22/09",
    como: "Conhecer a plataforma. Realizado reunião com Bruno, da Sinaxys, apresentou a plataforma e forneceu um período teste.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Sinaxys / Bruno"
  },
  {
    id: "act-34",
    pilar: "PLATAFORMA DE CAPTAÇÃO DE MÉDICOS",
    pilarCategoria: "Plataformas de Recrutamento",
    acao: "Execução do período de teste de 12 dias na Sinaxys",
    responsavel: "Raquel",
    dataInicio: "23/09",
    prazo: "05/10",
    como: "Período de teste - 12 dias",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Sinaxys"
  },
  {
    id: "act-35",
    pilar: "PLATAFORMA DE CAPTAÇÃO DE MÉDICOS",
    pilarCategoria: "Plataformas de Recrutamento",
    acao: "Analisar viabilidade e negociação de contratação da Sinaxys",
    responsavel: "Raquel",
    dataInicio: "05/10",
    prazo: "08/10",
    como: "Analisar viabilidade da contratação. Agendada reunião com a Sinaxys para o dia 15/10 às 16hs para negociação e contratação. Enviaram a minuta do contrato para análise. Em tratativas contratuais. Agendada nova reunião para o dia 26/10 para o Rafael tirar algumas dúvidas.",
    status: "Em andamento",
    progresso: 60,
    prioridade: "Alta",
    unidadeOuParceiro: "Sinaxys"
  },

  // --- PILAR 11: MEVO ---
  {
    id: "act-36",
    pilar: "MEVO",
    pilarCategoria: "Parcerias Tecnológicas & Prescrição",
    acao: "Fazer contato com Thalita (parceria Mevo) para obtenção de listagem médica",
    responsavel: "Eduardo",
    dataInicio: "28/09",
    prazo: "08/10",
    como: "Fazer contato Thalita (Responsável) da nossa parceria e buscar alguma listagem. Whats para marcar horário, disse que ia ver, ainda sem data.",
    status: "Em andamento",
    progresso: 40,
    prioridade: "Alta",
    unidadeOuParceiro: "Mevo / Thalita"
  },

  // --- PILAR 12: PROFISSIONAIS DE INSTITUIÇÕES QUE CUIDAM DO CORPO CLÍNICO - APROXIMAÇÃO PARA INDICAÇÃO E PARCERIA ---
  {
    id: "act-37",
    pilar: "PROFISSIONAIS DE INSTITUIÇÕES QUE CUIDAM DO CORPO CLÍNICO - APROXIMAÇÃO PARA INDICAÇÃO E PARCERIA",
    pilarCategoria: "Hospitais & Corpo Clínico",
    acao: "Agendar reunião com Milena (Hospital Blanc)",
    responsavel: "Raquel",
    dataInicio: "25/09",
    prazo: "23/10",
    como: "Agendar reunião com Milena Hosp Blanc, após retorno das férias dela, que será dia 13/10. Agendada reunião no Hospital Blanc no dia 16/10 às 11hs. Remarcada para 23/10 às 15hs.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "Hospital Blanc / Milena"
  },
  {
    id: "act-38",
    pilar: "PROFISSIONAIS DE INSTITUIÇÕES QUE CUIDAM DO CORPO CLÍNICO - APROXIMAÇÃO PARA INDICAÇÃO E PARCERIA",
    pilarCategoria: "Hospitais & Corpo Clínico",
    acao: "Agendar reunião com William (representante de materiais cirúrgicos)",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "20/10",
    como: "Agendar reunião com William, representante de materiais cirurgicos. Agendada reunião na Salute no dia 14/10 (quarta-feira) às 09hs, ele cancelou e ainda não passou nova data, já cobrei retorno.",
    status: "Em andamento",
    progresso: 40,
    prioridade: "Alta",
    unidadeOuParceiro: "Materiais Cirúrgicos / William"
  },
  {
    id: "act-39",
    pilar: "PROFISSIONAIS DE INSTITUIÇÕES QUE CUIDAM DO CORPO CLÍNICO - APROXIMAÇÃO PARA INDICAÇÃO E PARCERIA",
    pilarCategoria: "Hospitais & Corpo Clínico",
    acao: "Agendar reunião com Cristiane (Hospital São Lucas da PUCRS)",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "28/10",
    como: "Agendar reunião com Cristiane, Hosp São Lucas da PUCRS",
    status: "Não iniciado",
    progresso: 0,
    prioridade: "Alta",
    unidadeOuParceiro: "Hospital São Lucas PUCRS"
  },

  // --- PILAR 13: CRM COM PROGRAMA DE RELACIONAMENTO (RÉGUA) ---
  {
    id: "act-40",
    pilar: "CRM COM PROGRAMA DE RELACIONAMENTO (RÉGUA)",
    pilarCategoria: "Relacionamento & Régua CRM",
    acao: "Conhecer a plataforma CRM, adaptar filtros/funil e alimentar banco médico",
    responsavel: "Marcyo",
    dataInicio: "25/09",
    prazo: "23/10",
    como: "Conhecer a plataforma com Márcyo - 25/9. Adaptação dos filtros, funil - 2/10. Alimentar banco de profissionais - 2/10.",
    status: "Em andamento",
    progresso: 50,
    prioridade: "Alta",
    unidadeOuParceiro: "CRM / Marcyo"
  },

  // --- PILAR 14: PUBLICAÇÃO SITE CRM ---
  {
    id: "act-41",
    pilar: "PUBLICAÇÃO SITE CRM",
    pilarCategoria: "Conselhos de Classe & CRM",
    acao: "Buscar no site ou falar com o CRM para publicação de vagas",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "24/09",
    como: "Buscar no site ou falar com o CRM para publicação de vagas",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "CRM"
  },
  {
    id: "act-42",
    pilar: "PUBLICAÇÃO SITE CRM",
    pilarCategoria: "Conselhos de Classe & CRM",
    acao: "Alinhamento e verificação junto ao CREMERS para publicação de vagas",
    responsavel: "Raquel",
    dataInicio: "24/09",
    prazo: "24/09",
    como: "Realizado contato com o CREMERS e informaram que não realizam publicação de vagas para médicos.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "CREMERS"
  },

  // --- PILAR 15: PUBLICAÇÃO DE VAGA NO SIMERS ---
  {
    id: "act-43",
    pilar: "PUBLICAÇÃO DE VAGA NO SIMERS",
    pilarCategoria: "Entidades Médicas & SIMERS",
    acao: "Buscar no site ou falar com o SIMERS para publicação de vagas",
    responsavel: "Raquel",
    dataInicio: "29/09",
    prazo: "30/09",
    como: "Buscar no site ou falar com o Simers para publicação de vagas. Contato por telefone, orientação é enviar e-mail solicitando orientações.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "SIMERS"
  },
  {
    id: "act-44",
    pilar: "PUBLICAÇÃO DE VAGA NO SIMERS",
    pilarCategoria: "Entidades Médicas & SIMERS",
    acao: "Envio de e-mail e solicitação de orientações/formulário ao SIMERS",
    responsavel: "Raquel",
    dataInicio: "29/09",
    prazo: "30/09",
    como: "Envio de e-mail para o SIMERS com solitação de orientações para publicação de vagas. Retornaram com formulário para divulgação de vagas, orientando que o Simers disponibiliza uma plataforma exclusiva e gratuita para divulgação de vagas aos associados, com objetivo de oferecer ao médico uma visão ampla do mercado de trabalho no RS.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "SIMERS"
  },
  {
    id: "act-45",
    pilar: "PUBLICAÇÃO DE VAGA NO SIMERS",
    pilarCategoria: "Entidades Médicas & SIMERS",
    acao: "Retorno com os dados da vaga para divulgação na plataforma do SIMERS",
    responsavel: "Raquel",
    dataInicio: "29/09",
    prazo: "30/09",
    como: "Retorno com os dados da vaga para divulgação. Vaga ficará disponível na plataforma do Simers por 60 dias.",
    status: "Sistêmico",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "SIMERS Plataforma"
  },

  // --- PILAR 16: PUBLICAÇÃO DE VAGA NA AMRIGS ---
  {
    id: "act-46",
    pilar: "PUBLICAÇÃO DE VAGA NA AMRIGS",
    pilarCategoria: "Associações Médicas & AMRIGS",
    acao: "Buscar no site ou falar com a AMRIGS para publicação de vagas",
    responsavel: "Raquel",
    dataInicio: "29/09",
    prazo: "30/09",
    como: "Buscar no site ou falar com a AMRIGS para publicação de vagas. Contato por telefone, orientação é enviar e-mail que será respondido com formulário para preenchimento e posterior avaliação do comitê de boas práticas médicas e do gestor da AMRIGS.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "AMRIGS"
  },
  {
    id: "act-47",
    pilar: "PUBLICAÇÃO DE VAGA NA AMRIGS",
    pilarCategoria: "Associações Médicas & AMRIGS",
    acao: "Envio de e-mail para a AMRIGS e recebimento de formulário para publicação",
    responsavel: "Raquel",
    dataInicio: "30/09",
    prazo: "30/09",
    como: "Envio de e-mail para a AMRIGS com solitação de orientações para publicação de vagas. Aguardar formulário para preenchimento. Retornaram com formulário.",
    status: "Finalizado",
    progresso: 100,
    prioridade: "Alta",
    unidadeOuParceiro: "AMRIGS"
  },
  {
    id: "act-48",
    pilar: "PUBLICAÇÃO DE VAGA NA AMRIGS",
    pilarCategoria: "Associações Médicas & AMRIGS",
    acao: "Envio do formulário preenchido com dados da vaga para aprovação na AMRIGS",
    responsavel: "Raquel",
    dataInicio: "30/09",
    prazo: "19/10",
    como: "Envio do formulário preenchido para a AMRIGS com os dados para divulgação da vaga, para aprovação. AMRIGS retornou solicitando colocar valor na vaga. Alterado para formulários por especialidade, incluído o valor das consultas e devolvido para a AMRIGS. Retornaram que foi enviado para a verificação da gerência.",
    status: "Em andamento",
    progresso: 70,
    prioridade: "Alta",
    unidadeOuParceiro: "AMRIGS"
  }
];

// Interface para um Workspace / Painel de Projeto completo
export interface ProjectWorkspace {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  iconName: 'Building2' | 'DollarSign' | 'Activity' | 'FolderKanban' | 'Stethoscope';
  badge: string;
  themeColor: string;
  actions: ProjectAction[];
  updatedAt?: string;
  createdAt?: string;
}

// 2. PAINEL DE RECEITAS INTERNAS (35 ações estruturadas em 4 pilares estratégicos conforme Projeto 360)
export const INITIAL_RECEITAS_INTERNAS_PROJECTS: ProjectAction[] = [
  // =========================================================================
  // PILAR 1: DISPONIBILIDADE E OCUPAÇÃO
  // Início 02/01/2026 · Prazo 31/08/2026 · 2 de 5 etapas concluídas
  // =========================================================================

  // Grupo 1.1: Organizar base de dados das agendas e ocupação (4/4 concluídas)
  {
    id: 'rec-01',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Organizar base de dados das agendas e ocupação',
    acao: 'Desenvolver relatório no Real Clinic',
    responsavel: 'Eduardo',
    dataInicio: '02/01/2026',
    prazo: '30/01/2026',
    como: 'Desenvolver relatório no Real Clinic para extração e consolidação dos dados de agendas e taxas de ocupação.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Real Clinic / TI'
  },
  {
    id: 'rec-02',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Organizar base de dados das agendas e ocupação',
    acao: 'Corrigir rotinas de abrir e fechamento de agenda no Real Clinic',
    responsavel: 'Eduardo',
    dataInicio: '01/02/2026',
    prazo: '15/02/2026',
    como: 'Corrigir e padronizar rotinas de abertura e fechamento de agenda no Real Clinic em todas as unidades.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Todas as Unidades'
  },
  {
    id: 'rec-03',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Organizar base de dados das agendas e ocupação',
    acao: 'Levar BI exclusivo de agendas e ocupação - aferição de dados',
    responsavel: 'Eduardo',
    dataInicio: '01/03/2026',
    prazo: '30/06/2026',
    como: 'Levar BI exclusivo de agendas e ocupação com aferição de dados analíticos em tempo real.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'BI / Gestão'
  },
  {
    id: 'rec-04',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Organizar base de dados das agendas e ocupação',
    acao: 'Modelo Offline excel | aferição de dados e formas de visualização',
    responsavel: 'Eduardo',
    dataInicio: '01/04/2026',
    prazo: '30/04/2026',
    como: 'Construção de modelo offline em Excel para aferição de dados e formas de visualização rápida da operação.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Média',
    unidadeOuParceiro: 'Operações'
  },

  // Grupo 1.2: Criar os ritos de acompanhamento de disponibilidade e ocupação (3/3 concluídas)
  {
    id: 'rec-05',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Criar os ritos de acompanhamento de disponibilidade e ocupação',
    acao: 'Adequar times de agendas',
    responsavel: 'Fabiano',
    dataInicio: '01/06/2026',
    prazo: '30/06/2026',
    como: 'Adequação dos times operacionais dedicados à gestão, abertura e manutenção das agendas.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Central de Agendamento'
  },
  {
    id: 'rec-06',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Criar os ritos de acompanhamento de disponibilidade e ocupação',
    acao: 'Definir encontros semanais (segunda e quinta) para análise',
    responsavel: 'Fabiano / Eduardo',
    dataInicio: '01/05/2026',
    prazo: '10/06/2026',
    como: 'Definir e executar encontros semanais (segunda e quinta-feira) para análise detalhada dos indicadores de ocupação.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Diretoria / Coordenação'
  },
  {
    id: 'rec-07',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Criar os ritos de acompanhamento de disponibilidade e ocupação',
    acao: 'Definir objetivos de disponibilidade por tipo de produto (agendas médicas, odonto, terapias e exames)',
    responsavel: 'Fabiano',
    dataInicio: '01/06/2026',
    prazo: '30/06/2026',
    como: 'Definir metas e objetivos claros de disponibilidade por linha de produto: consultas médicas, odonto, terapias e exames.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Todas as Áreas'
  },

  // Grupo 1.3: Analise das capacidades de disponibilidade e ocupação (0/1 em andamento)
  {
    id: 'rec-08',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Analise das capacidades de disponibilidade e ocupação',
    acao: 'Adequação de capacidade X demanda',
    responsavel: 'Eduardo / Fabiano',
    dataInicio: '01/04/2026',
    prazo: 'Em andamento',
    como: 'Estudo e adequação contínua entre a capacidade instalada de consultórios e a curva de demanda dos pacientes.',
    status: 'Em andamento',
    progresso: 50,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Planejamento Operacional'
  },

  // Grupo 1.4: Automatizar análise das disponibilidade e ocupação com uso de IA (0/2 em andamento)
  {
    id: 'rec-09',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Automatizar análise das disponibilidade e ocupação com uso de IA',
    acao: 'Criar alertas visuais',
    responsavel: 'Eduardo',
    dataInicio: '09/07/2026',
    prazo: '31/08/2026',
    como: 'Criar alertas visuais automatizados para sinalizar ociosidade de agendas e desvios de ocupação.',
    status: 'Em andamento',
    progresso: 50,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / Automação IA'
  },
  {
    id: 'rec-10',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Automatizar análise das disponibilidade e ocupação com uso de IA',
    acao: 'Dados em real time',
    responsavel: 'Eduardo',
    dataInicio: '09/07/2026',
    prazo: '31/08/2026',
    como: 'Disponibilização de dados de ocupação e horários livres em tempo real com apoio de modelos analíticos.',
    status: 'Em andamento',
    progresso: 40,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / BI'
  },

  // Grupo 1.5: Formas de fomentar ocupação (0/2 em andamento)
  {
    id: 'rec-11',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Formas de fomentar ocupação',
    acao: 'Ações de contact center (objetivos de ocupação por especialidades, agendas criticas - adiantar pacientes e reduzir perda nos canais)',
    responsavel: 'Fabiano',
    dataInicio: '09/07/2026',
    prazo: 'Em andamento',
    como: 'Ações ativas de contact center com metas de ocupação por especialidade e agendas críticas: antecipar pacientes e diminuir taxa de desistência nos canais.',
    status: 'Em andamento',
    progresso: 50,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Contact Center'
  },
  {
    id: 'rec-12',
    pilar: 'DISPONIBILIDADE E OCUPAÇÃO',
    pilarCategoria: 'Formas de fomentar ocupação',
    acao: 'Analise de movimento contact center diário (volume, atendimento, perda e agendamento)',
    responsavel: 'Eduardo',
    dataInicio: '30/06/2026',
    prazo: 'Em andamento',
    como: 'Acompanhamento diário das métricas do contact center: volume total, chamadas atendidas, perda e conversão em agendamentos.',
    status: 'Em andamento',
    progresso: 60,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Contact Center / Qualidade'
  },

  // =========================================================================
  // PILAR 2: TREINAMENTOS
  // Início 02/01/2026 · Prazo 28/12/2026 · 2 de 3 etapas concluídas
  // =========================================================================

  // Grupo 2.1: Desenvolvimento da Trilha de Capacitação Comercial/Recepção (4/4 concluídas)
  {
    id: 'rec-13',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Desenvolvimento da Trilha de Capacitação Comercial/Recepção',
    acao: 'Montar trilha dos treinamentos da Capacitação Comercial Exames (sistema de capacitação online)',
    responsavel: 'Juliana',
    dataInicio: '01/03/2026',
    prazo: '31/07/2026',
    como: 'Montar trilha dos treinamentos da Capacitação Comercial Exames no sistema de capacitação online.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Capacitação Online / EAD'
  },
  {
    id: 'rec-14',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Desenvolvimento da Trilha de Capacitação Comercial/Recepção',
    acao: 'Montar trilha dos treinamentos jornada do paciente, atendimento humanizado, explicação de exames e planos, abordagem consultiva (sistema de capacitação online)',
    responsavel: 'Juliana',
    dataInicio: '25/05/2026',
    prazo: '01/07/2026',
    como: 'Montar trilha de treinamentos online: jornada do paciente, atendimento humanizado, explicação de exames e planos, e abordagem consultiva.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Capacitação Online / EAD'
  },
  {
    id: 'rec-15',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Desenvolvimento da Trilha de Capacitação Comercial/Recepção',
    acao: 'Treinamento de Vendas para Recepções. Viés comercial, como apresentar Exames, como quebrar objeções Pílulas semanais de 15 min com o líder e 1 pessoa da recepção',
    responsavel: 'Juliana',
    dataInicio: '25/05/2026',
    prazo: '01/07/2026',
    como: 'Treinamento de vendas para recepções com viés comercial, apresentação de exames, superação de objeções e pílulas semanais de 15 min entre líder e colaborador.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Recepções Salute'
  },
  {
    id: 'rec-16',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Desenvolvimento da Trilha de Capacitação Comercial/Recepção',
    acao: 'Aplicar treinamentos presenciais de vendas para conversão de exames recepção',
    responsavel: 'Juliana',
    dataInicio: '03/07/2026',
    prazo: '03/07/2026',
    como: 'Aplicação prática e presencial de treinamentos de vendas para alavancar a conversão de exames nas recepções das clínicas.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Todas as Clínicas'
  },

  // Grupo 2.2: Desenvolvimento da Trilha de Treinamentos no RealClinic (0/1 pendente)
  {
    id: 'rec-17',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Desenvolvimento da Trilha de Treinamentos no RealClinic',
    acao: 'Montar trilha dos treinamentos no sistema RealClinic (sistema de capacitação online)',
    responsavel: 'Eduardo',
    dataInicio: '01/03/2026',
    prazo: '31/07/2026',
    como: 'Montar trilha dos treinamentos no sistema RealClinic na plataforma de capacitação online para capacitação contínua.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Média',
    unidadeOuParceiro: 'Real Clinic / TI'
  },

  // Grupo 2.3: Implementação de Ritual Semanal de Performance das Clínicas (1/1 concluída)
  {
    id: 'rec-18',
    pilar: 'TREINAMENTOS',
    pilarCategoria: 'Implementação de Ritual Semanal de Performance das Clínicas',
    acao: 'Ritual semanal com a das clinicas. Indicadores, metas, taxa de conversão, qualidade.',
    responsavel: 'Fabiano',
    dataInicio: '02/01/2026',
    prazo: '28/12/2026',
    como: 'Ritual semanal com as clínicas para acompanhamento de indicadores de desempenho, metas financeiras, taxa de conversão e qualidade de atendimento.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Gestão de Clínicas'
  },

  // =========================================================================
  // PILAR 3: AÇÕES DENTRO DO CONSULTÓRIO
  // Início 05/06/2026 · Prazo 10/07/2026 · 0 de 2 etapas concluídas
  // =========================================================================

  // Grupo 3.1: Desenvolver protocolos no prontuário médico (2/4 concluídas)
  {
    id: 'rec-19',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Desenvolver protocolos no prontuário médico',
    acao: 'Desenho do modelo sem IA',
    responsavel: 'Eduardo',
    dataInicio: '05/06/2026',
    prazo: '30/06/2026',
    como: 'Desenho inicial da estrutura e fluxo dos protocolos médicos no prontuário eletrônico sem suporte de IA.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Corpo Clínico / TI'
  },
  {
    id: 'rec-20',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Desenvolver protocolos no prontuário médico',
    acao: 'Definir modelo de protocolo (exames sem conduta)',
    responsavel: 'Eduardo',
    dataInicio: '05/06/2026',
    prazo: '30/06/2026',
    como: 'Definição do modelo de protocolo para acompanhamento e conduta de exames sem fechamento prévio.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Diretoria Médica'
  },
  {
    id: 'rec-21',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Desenvolver protocolos no prontuário médico',
    acao: 'Receber orçamento do desenvolvimento',
    responsavel: 'Eduardo',
    dataInicio: '24/06/2026',
    prazo: '10/07/2026',
    como: 'Receber e avaliar o orçamento de desenvolvimento de software para parametrização dos novos protocolos médicos.',
    status: 'Em andamento',
    progresso: 70,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / Financeiro'
  },
  {
    id: 'rec-22',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Desenvolver protocolos no prontuário médico',
    acao: 'Piloto na especialidade de endocrinologia',
    responsavel: 'Eduardo',
    dataInicio: '01/07/2026',
    prazo: 'Em andamento',
    como: 'Implementação e validação prática do piloto de protocolos na especialidade de endocrinologia.',
    status: 'Em andamento',
    progresso: 40,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Endocrinologia'
  },

  // Grupo 3.2: Ações de comunicação com médicos (0/6 em andamento/planejadas)
  {
    id: 'rec-23',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: 'Onboarding dos médicos',
    responsavel: 'Fabiano',
    dataInicio: '20/07/2026',
    prazo: 'A definir',
    como: 'Estruturação do processo e materiais institucionais de onboarding e integração de novos médicos à rede Salute.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Relacionamento Médico'
  },
  {
    id: 'rec-24',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: '1º dia do médico',
    responsavel: 'Fabiano',
    dataInicio: '20/07/2026',
    prazo: 'A definir',
    como: 'Roteiro de acolhimento e suporte no primeiro dia de atendimento do médico na clínica.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Média',
    unidadeOuParceiro: 'Operações Clínicas'
  },
  {
    id: 'rec-25',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: 'Grupo de médicos nas unidades',
    responsavel: 'Fabiano',
    dataInicio: '20/07/2026',
    prazo: 'Em andamento',
    como: 'Criação e dinamização de grupos dedicados de médicos por unidade para comunicação ágil e engajamento.',
    status: 'Em andamento',
    progresso: 35,
    prioridade: 'Normal',
    unidadeOuParceiro: 'Comunicação Interna'
  },
  {
    id: 'rec-26',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: 'INFO médico (1. Refazer guias com nova plataforma de vídeos; 2. revisar textos; 3. Entregas melhorias de prontuário)',
    responsavel: 'Eduardo',
    dataInicio: '20/07/2026',
    prazo: 'A definir',
    como: 'Disparo de boletim informativo para os médicos: 1. Refazer guias com nova plataforma de vídeos; 2. Revisar textos informativos; 3. Comunicar entregas e melhorias de prontuário.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Comunicação Médica'
  },
  {
    id: 'rec-27',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: 'Dia do LAB DASA',
    responsavel: 'Eduardo',
    dataInicio: '25/07/2026',
    prazo: 'A definir',
    como: 'Organização do Dia do LAB DASA para estreitar relação entre o corpo clínico e o parceiro laboratorial.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Normal',
    unidadeOuParceiro: 'DASA / Clínicas'
  },
  {
    id: 'rec-28',
    pilar: 'AÇÕES DENTRO DO CONSULTÓRIO',
    pilarCategoria: 'Ações de comunicação com médicos',
    acao: 'Divulgar para os profissionais (resultados nos prontuários e tempo de resultado)',
    responsavel: 'Eduardo',
    dataInicio: '25/07/2026',
    prazo: 'A definir',
    como: 'Divulgar ativamente para os profissionais médicos a disponibilidade dos resultados diretamente no prontuário e os prazos reduzidos de entrega de laudos.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Média',
    unidadeOuParceiro: 'Corpo Clínico'
  },

  // =========================================================================
  // PILAR 4: LAB
  // Início 01/07/2026 · Prazo 29/07/2026 · 0 de 3 etapas concluídas
  // =========================================================================

  // Grupo 4.1: Integração DASA X RealClinic (1/2 concluídas)
  {
    id: 'rec-29',
    pilar: 'LAB',
    pilarCategoria: 'Integração DASA X RealClinic',
    acao: 'Migrar resultados para visualização do prontuário e recepção | exames com resultados COMPLETOS',
    responsavel: 'Eduardo',
    dataInicio: '06/07/2026',
    prazo: '29/07/2026',
    como: 'Migração e integração dos resultados de exames completos da DASA para visualização direta no prontuário médico e nas recepções via Real Clinic.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / DASA'
  },
  {
    id: 'rec-30',
    pilar: 'LAB',
    pilarCategoria: 'Integração DASA X RealClinic',
    acao: 'Migrar resultados para visualização do prontuário e recepção | exames com resultados PARCIAIS',
    responsavel: 'Eduardo',
    dataInicio: '06/07/2026',
    prazo: 'Em andamento',
    como: 'Parametrização e testes para permitir a visualização de exames com resultados parciais diretamente no prontuário e recepção.',
    status: 'Em andamento',
    progresso: 60,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / DASA'
  },

  // Grupo 4.2: Ativação de novos postos de coleta Viamão e Centro (1/3 concluídas)
  {
    id: 'rec-31',
    pilar: 'LAB',
    pilarCategoria: 'Ativação de novos postos de coleta Viamão e Centro',
    acao: 'Reunião em 07/08 para tratar',
    responsavel: 'Fabiano',
    dataInicio: '09/07/2026',
    prazo: '07/08/2026',
    como: 'Realização de reunião executiva em 07/08 para definição das diretrizes de implantação dos novos postos de coleta.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Diretoria de Operações'
  },
  {
    id: 'rec-32',
    pilar: 'LAB',
    pilarCategoria: 'Ativação de novos postos de coleta Viamão e Centro',
    acao: 'Viamão',
    responsavel: 'Fabiano',
    dataInicio: '09/07/2026',
    prazo: 'Em andamento',
    como: 'Execução e ativação do novo posto de coleta laboratorial na unidade Viamão.',
    status: 'Em andamento',
    progresso: 60,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Viamão'
  },
  {
    id: 'rec-33',
    pilar: 'LAB',
    pilarCategoria: 'Ativação de novos postos de coleta Viamão e Centro',
    acao: 'Centro',
    responsavel: 'Fabiano',
    dataInicio: '09/07/2026',
    prazo: 'Em andamento',
    como: 'Execução e ativação do novo posto de coleta laboratorial na unidade Centro.',
    status: 'Em andamento',
    progresso: 50,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Centro'
  },

  // Grupo 4.3: Revisar os valores praticados pela concorrência (Lab e imagem) (1/2 concluídas)
  {
    id: 'rec-34',
    pilar: 'LAB',
    pilarCategoria: 'Revisar os valores praticados pela concorrência (Lab e imagem)',
    acao: 'Análises clínicas',
    responsavel: 'Larissa / Eduardo',
    dataInicio: '01/07/2026',
    prazo: '17/07/2026',
    como: 'Revisão e benchmarking completo dos valores de exames de análises clínicas praticados pelos laboratórios concorrentes na região.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Comercial & Precificação'
  },
  {
    id: 'rec-35',
    pilar: 'LAB',
    pilarCategoria: 'Revisar os valores praticados pela concorrência (Lab e imagem)',
    acao: 'Exames de imagem',
    responsavel: 'Larissa / Eduardo',
    dataInicio: '01/07/2026',
    prazo: 'A definir',
    como: 'Levantamento comparativo de preços e condições de exames de diagnóstico por imagem ofertados pelo mercado.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Média',
    unidadeOuParceiro: 'Comercial & Precificação'
  }
];

// 3. PAINEL DE EXAMES (12 ações estratégicas operacionais)
export const INITIAL_EXAMES_PROJECTS: ProjectAction[] = [
  {
    id: 'exm-01',
    pilar: 'PARQUE DE DIAGNÓSTICO POR IMAGEM & CARDIO',
    pilarCategoria: 'Diagnóstico por Imagem',
    acao: 'Instalação e calibração de Ultrassom Doppler de alta resolução na unidade Gravataí',
    responsavel: 'Eduardo',
    dataInicio: '01/set',
    prazo: '14/set',
    como: 'Instalação física, homologação pela equipe técnica e treinamento da equipe de enfermagem e médicos ultrassonografistas.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Gravataí'
  },
  {
    id: 'exm-02',
    pilar: 'PARQUE DE DIAGNÓSTICO POR IMAGEM & CARDIO',
    pilarCategoria: 'Diagnóstico por Imagem',
    acao: 'Expansão da grade de exames de ECG e Holter/MAPA 24h para o turno estendido',
    responsavel: 'Karina',
    dataInicio: '15/set',
    prazo: '10/out',
    como: 'Disponibilização de agendas aos sábados e no horário até as 20h, reduzindo fila de espera em 70%.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Todas as Unidades'
  },
  {
    id: 'exm-03',
    pilar: 'PARQUE DE DIAGNÓSTICO POR IMAGEM & CARDIO',
    pilarCategoria: 'Diagnóstico por Imagem',
    acao: 'Estudo de viabilidade técnica e aquisição de Raio-X Digital para a unidade Alvorada',
    responsavel: 'Erno',
    dataInicio: '01/out',
    prazo: '30/out',
    como: 'Levantamento de custo de baritagem da sala, licenciamento na vigilância sanitária e cotação com 3 fornecedores de equipamentos.',
    status: 'Em andamento',
    progresso: 45,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Alvorada'
  },
  {
    id: 'exm-04',
    pilar: 'LABORATÓRIO DE ANÁLISES CLÍNICAS & POSTOS DE COLETA',
    pilarCategoria: 'Análises Clínicas',
    acao: 'Integração de interfaceamento automático LIS-HIS entre laboratório parceiro e sistema Salute',
    responsavel: 'Fabiano',
    dataInicio: '05/set',
    prazo: '25/set',
    como: 'Envio eletrônico de pedidos de exame e importação automática de resultados assinados digitalmente para o prontuário.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / Laboratório'
  },
  {
    id: 'exm-05',
    pilar: 'LABORATÓRIO DE ANÁLISES CLÍNICAS & POSTOS DE COLETA',
    pilarCategoria: 'Análises Clínicas',
    acao: 'Criação do Espaço Coleta Kids com equipe especializada e protocolo sem dor',
    responsavel: 'Karina',
    dataInicio: '10/set',
    prazo: '28/set',
    como: 'Decoração lúdica, visualizador de veias por infravermelho e certificadinho de coragem para crianças.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Média',
    unidadeOuParceiro: 'Gravataí e Canoas'
  },
  {
    id: 'exm-06',
    pilar: 'LABORATÓRIO DE ANÁLISES CLÍNICAS & POSTOS DE COLETA',
    pilarCategoria: 'Análises Clínicas',
    acao: 'Ampliação do catálogo de exames para incluir painéis genéticos e exames toxicológicos',
    responsavel: 'Raquel',
    dataInicio: '01/out',
    prazo: '25/out',
    como: 'Convênio com laboratório de apoio de referência nacional para atendimento de motoristas profissionais e testes de intolerância.',
    status: 'Em andamento',
    progresso: 60,
    prioridade: 'Média',
    unidadeOuParceiro: 'Corporativo / Parcerias'
  },
  {
    id: 'exm-07',
    pilar: 'SLA DE LAUDOS, TELELAUDO & ENTREGA DIGITAL',
    pilarCategoria: 'Laudos & Eficiência',
    acao: 'Contratação de central 24/7 de Telemedicina para emissão de laudos de ECG em até 1 hora',
    responsavel: 'Eduardo',
    dataInicio: '02/set',
    prazo: '18/set',
    como: 'Implantação de plataforma em nuvem onde o traçado é transmitido instantaneamente e laudado por cardiologistas plantonistas.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Cardiologia'
  },
  {
    id: 'exm-08',
    pilar: 'SLA DE LAUDOS, TELELAUDO & ENTREGA DIGITAL',
    pilarCategoria: 'Laudos & Eficiência',
    acao: 'Portal de resultados online e envio de laudos com alerta por SMS e WhatsApp',
    responsavel: 'Fabiano',
    dataInicio: '20/set',
    prazo: '20/out',
    como: 'O paciente acessa o laudo com autenticação segura de dois fatores (2FA) sem precisar retornar à clínica apenas para buscar papel.',
    status: 'Em andamento',
    progresso: 85,
    prioridade: 'Alta',
    unidadeOuParceiro: 'TI / Pacientes'
  },
  {
    id: 'exm-09',
    pilar: 'SLA DE LAUDOS, TELELAUDO & ENTREGA DIGITAL',
    pilarCategoria: 'Laudos & Eficiência',
    acao: 'Renegociação de prazos de laudos anatomopatológicos e biópsias para máximo de 5 dias úteis',
    responsavel: 'Raquel',
    dataInicio: 'A definir',
    prazo: 'A definir',
    como: 'Reunião com diretoria do laboratório parceiro para estipular multa contratual em caso de atraso na entrega de laudos críticos.',
    status: 'Não iniciado',
    progresso: 0,
    prioridade: 'Média',
    unidadeOuParceiro: 'Patologia'
  },
  {
    id: 'exm-10',
    pilar: 'CONVERSÃO CONSULTA-EXAME & FIDELIZAÇÃO DIAGNÓSTICA',
    pilarCategoria: 'Conversão & Fidelização',
    acao: 'Implantação de agendamento imediato na saída dos consultórios com guichê exclusivo',
    responsavel: 'Karina',
    dataInicio: '08/set',
    prazo: '26/set',
    como: 'Paciente que sai da consulta com pedido de exame já sai com data e horário marcados e orientações de preparo impressas.',
    status: 'Finalizado',
    progresso: 100,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Recepção / Ambulatório'
  },
  {
    id: 'exm-11',
    pilar: 'CONVERSÃO CONSULTA-EXAME & FIDELIZAÇÃO DIAGNÓSTICA',
    pilarCategoria: 'Conversão & Fidelização',
    acao: 'Monitoramento em tempo real do índice de conversão de exames gerados por consultório médico',
    responsavel: 'Fabiano',
    dataInicio: '28/set',
    prazo: '22/out',
    como: 'Relatório semanal identificando especialidades com maior evasão de pedidos para criação de campanhas de conscientização.',
    status: 'Em andamento',
    progresso: 75,
    prioridade: 'Alta',
    unidadeOuParceiro: 'Inteligência de Dados'
  },
  {
    id: 'exm-12',
    pilar: 'CONVERSÃO CONSULTA-EXAME & FIDELIZAÇÃO DIAGNÓSTICA',
    pilarCategoria: 'Conversão & Fidelização',
    acao: 'Pesquisa de satisfação específica (NPS) com foco em tempo de espera e pontualidade dos exames',
    responsavel: 'Raquel',
    dataInicio: '05/out',
    prazo: '31/out',
    como: 'Disparo de formulário rápido de 2 perguntas no WhatsApp logo após a realização do exame na clínica.',
    status: 'Em andamento',
    progresso: 30,
    prioridade: 'Normal',
    unidadeOuParceiro: 'Qualidade / Ouvidoria'
  }
];

// LISTA INICIAL DE WORKSPACES / PAINÉIS
export const INITIAL_WORKSPACES: ProjectWorkspace[] = [
  {
    id: 'projetos-estrategicos',
    title: 'Projetos Estratégicos',
    subtitle: 'Plano Estratégico de Captação & Expansão Médica',
    category: 'Expansão & Corpo Clínico',
    description: 'Monitoramento de captação de médicos, parcerias com universidades, COREME, conselhos de classe, concorrência e abertura de unidades.',
    badge: 'Expansão Médica',
    iconName: 'Building2',
    themeColor: '#113269',
    actions: INITIAL_PROJECTS,
    updatedAt: 'Outubro 2026'
  },
  {
    id: 'receitas-internas',
    title: 'Receitas Internas',
    subtitle: 'Projeto 360: Disponibilidade, Treinamentos, Consultório & Lab',
    category: 'Receitas & Eficiência Operacional',
    description: 'Gestão de disponibilidade e ocupação de agendas, trilhas de capacitação comercial e de recepção, protocolos de consultório e integração laboratorial DASA.',
    badge: 'Projeto 360',
    iconName: 'DollarSign',
    themeColor: '#0c663b',
    actions: INITIAL_RECEITAS_INTERNAS_PROJECTS,
    updatedAt: 'Agosto 2026'
  },
  {
    id: 'exames',
    title: 'Exames',
    subtitle: 'Parque Diagnóstico, Análises Clínicas & Eficiência de Laudos',
    category: 'Diagnósticos & Eficiência Clínica',
    description: 'Gestão e expansão da grade de exames por imagem e laboratoriais, integração digital de laudos, agilidade de entrega e conversão consulta-exame.',
    badge: 'Diagnósticos & Imagem',
    iconName: 'Activity',
    themeColor: '#0369a1',
    actions: INITIAL_EXAMES_PROJECTS,
    updatedAt: 'Outubro 2026'
  }
];

