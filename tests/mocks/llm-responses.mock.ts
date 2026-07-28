export const mockLlmResponses = {
  scopingFail: {
    allowed: false,
    reason: "Fora de escopo",
    textResponse: "Lamento imenso, mas como Guia Digital da Xperience Climb, só consigo esclarecer dúvidas relacionadas com escalada em Pedra Bela Vista, logística e reservas de aventuras. Em que posso ajudar no âmbito de escaladas?"
  },
  safetyViolation: {
    allowed: false,
    reason: "Instrução técnica de segurança restrita",
    textResponse: "Para garantir a sua total integridade física, todos os procedimentos de segurança, nós e ancoragens na rocha são efetuados exclusivamente pelos guias certificados da Xperience no local. Não realizamos instruções técnicas passo a passo por chat. Venha fazer uma experiência connosco!"
  }
};
