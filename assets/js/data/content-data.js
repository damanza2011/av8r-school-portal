/* ==========================================================================
   AV8R School · Content Data (Route, Programs, FAQ)
   ========================================================================== */

  const ROUTE = [
    { n: '01', es: ['Diagnóstico + inglés', 'Revisamos edad, inglés, experiencia, país y objetivo. Nivelamos lo que falte antes de entrar a teoría.'], en: ['Diagnosis + English', 'We review age, English, experience, country and goal. We level what is missing before theory.'], out: { es: 'Plan personal', en: 'Personal plan' } },
    { n: '02', es: ['A&P General', 'Fundamentos, regulaciones, matemáticas, física, materiales y seguridad. Base para todos los ratings.'], en: ['A&P General', 'Fundamentals, regulations, math, physics, materials and safety. The base for every rating.'], out: { es: 'Examen General', en: 'General test' } },
    { n: '03', es: ['Airframe + Powerplant', 'Estructuras, sistemas, motores y hélices. Teoría con práctica y proyectos.'], en: ['Airframe + Powerplant', 'Structures, systems, engines and propellers. Theory with practice and projects.'], out: { es: 'Proyectos y mocks', en: 'Projects and mocks' } },
    { n: '04', es: ['Práctica + Testing', 'Partner Part 147/145, logbook, PSI written y DME oral/practical. Sin simular lo oficial.'], en: ['Practice + Testing', 'Part 147/145 partner, logbook, PSI written and DME oral/practical. No faking the official.'], out: { es: 'Readiness real', en: 'Real readiness' } },
    { n: '05', es: ['OEM + Empleo', 'Aviación ejecutiva, portafolio, entrevistas y alianzas con empleadores. La visa se gestiona aparte.'], en: ['OEM + Employment', 'Business aviation, portfolio, interviews and employer alliances. Visa is handled separately.'], out: { es: 'Carrera', en: 'Career' } }
  ];

  const PROGRAMS = [
    { cat: 'ap', tag: { es: 'A&P · Nivel 1', en: 'A&P · Level 1' }, title: { es: 'A&P General', en: 'A&P General' }, desc: { es: 'Fundamentos, regulaciones, matemáticas, física, materiales y seguridad.', en: 'Fundamentals, regulations, math, physics, materials and safety.' }, meta: { es: 'Online · mentoría · quiz', en: 'Online · mentor · quiz' } },
    { cat: 'ap', tag: { es: 'A&P · Nivel 2', en: 'A&P · Level 2' }, title: { es: 'Airframe', en: 'Airframe' }, desc: { es: 'Estructuras, hidráulica, neumática, eléctrico y sistemas de la aeronave.', en: 'Structures, hydraulics, pneumatics, electrical and aircraft systems.' }, meta: { es: 'Video · práctica · mock', en: 'Video · practice · mock' } },
    { cat: 'ap', tag: { es: 'A&P · Nivel 3', en: 'A&P · Level 3' }, title: { es: 'Powerplant', en: 'Powerplant' }, desc: { es: 'Motores, hélices, combustible, ignición y sistemas de potencia.', en: 'Engines, propellers, fuel, ignition and powerplant systems.' }, meta: { es: 'Video · práctica · mock', en: 'Video · practice · mock' } },
    { cat: 'ap', tag: { es: 'A&P · Examen', en: 'A&P · Exam' }, title: { es: 'Exam Sprint', en: 'Exam Sprint' }, desc: { es: 'Mock written, oral y practical; rúbricas y preparación para DME.', en: 'Mock written, oral and practical; rubrics and DME preparation.' }, meta: { es: 'Cohorte · feedback', en: 'Cohort · feedback' } },
    { cat: 'english', tag: { es: 'Inglés', en: 'English' }, title: { es: 'Aviation English', en: 'Aviation English' }, desc: { es: 'Vocabulario técnico, lectura de manuales, entrevistas y comunicación de taller.', en: 'Technical vocabulary, manual reading, interviews and shop communication.' }, meta: { es: 'Online · speaking', en: 'Online · speaking' } },
    { cat: 'oem', tag: { es: 'OEM · Aviación ejecutiva', en: 'OEM · Business aviation' }, title: { es: 'Business Jet OEM', en: 'Business Jet OEM' }, desc: { es: 'Orientación a Gulfstream, Bombardier, Dassault, Embraer y Textron; ruta a factory training.', en: 'Orientation to Gulfstream, Bombardier, Dassault, Embraer and Textron; route to factory training.' }, meta: { es: 'Especialización', en: 'Specialization' } },
    { cat: 'oem', tag: { es: 'Aviónica', en: 'Avionics' }, title: { es: 'Avionics & Troubleshooting', en: 'Avionics & Troubleshooting' }, desc: { es: 'Sistemas, wiring, diagnóstico y aviónica de cabina ejecutiva.', en: 'Systems, wiring, troubleshooting and executive cabin avionics.' }, meta: { es: 'Video · casos', en: 'Video · cases' } },
    { cat: 'career', tag: { es: 'Empleo', en: 'Career' }, title: { es: 'Career Accelerator', en: 'Career Accelerator' }, desc: { es: 'CV técnico, entrevistas, portafolio, herramientas y preparación para empleadores.', en: 'Technical CV, interviews, portfolio, tools and employer preparation.' }, meta: { es: 'Mentoría · job board', en: 'Mentor · job board' } }
  ];

  const FAQ = [
    { q: { es: '¿Necesito experiencia previa?', en: 'Do I need previous experience?' }, a: { es: 'No para empezar la ruta. La FAA exige 18 meses por rating o 30 meses para A&P, o graduarse de una escuela Part 147. AV8R revisa tu caso y te dice qué falta.', en: 'Not to start the path. The FAA requires 18 months per rating or 30 months for A&P, or graduation from a Part 147 school. AV8R reviews your case and tells you what is missing.' } },
    { q: { es: '¿Es 100% online?', en: 'Is it 100% online?' }, a: { es: 'La teoría y la mentoría son online. La práctica, el oral/practical y el testing requieren un partner o DME autorizado. El video no reemplaza la práctica.', en: 'Theory and mentorship are online. Practice, oral/practical and testing require an authorized partner or DME. Video does not replace practice.' } },
    { q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' }, a: { es: 'Depende del cohorte, el país y el alcance. No publicamos precios que no estén confirmados. Pide una cotización por el chat o en la comunidad.', en: 'It depends on the cohort, country and scope. We do not publish unconfirmed prices. Request a quote in chat or in the community.' } },
    { q: { es: '¿AV8R certifica al técnico?', en: 'Does AV8R certify the technician?' }, a: { es: 'No. AV8R prepara y acompaña. La FAA emite el certificado A&P después de los exámenes y la experiencia requerida.', en: 'No. AV8R prepares and supports. The FAA issues the A&P certificate after the required tests and experience.' } },
    { q: { es: '¿El A&P me da visa de trabajo?', en: 'Does the A&P give me a work visa?' }, a: { es: 'No. El certificado A&P no otorga autorización de trabajo. Cualquier visa o empleo se gestiona por separado con un abogado de inmigración.', en: 'No. The A&P certificate does not grant work authorization. Any visa or employment is handled separately with an immigration attorney.' } },
    { q: { es: '¿Necesito inglés?', en: 'Do I need English?' }, a: { es: 'Sí. La FAA exige leer, escribir, hablar y entender inglés. Aviation English te prepara para manuales, entrevistas y taller.', en: 'Yes. The FAA requires reading, writing, speaking and understanding English. Aviation English prepares you for manuals, interviews and the shop.' } },
    { q: { es: '¿A&P + aviación ejecutiva?', en: 'A&P + business aviation?' }, a: { es: 'Sí. El A&P es la base; la aviación ejecutiva añade OEM, aviónica, interiores y servicio. Es la ruta de mayor especialización y salario.', en: 'Yes. A&P is the base; business aviation adds OEM, avionics, interiors and service. It is the highest-specialization, highest-pay path.' } },
    { q: { es: '¿Soy empleador?', en: 'I am an employer?' }, a: { es: 'Podemos explorar alianzas, prácticas y un pipeline de talento bilingüe. Escríbenos y revisamos el modelo.', en: 'We can explore alliances, internships and a bilingual talent pipeline. Write to us and we will review the model.' } }
  ];


// Export for ES modules and global window scope
if (typeof window !== 'undefined') {
  window.ROUTE = ROUTE;
  window.PROGRAMS = PROGRAMS;
  window.FAQ = FAQ;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROUTE, PROGRAMS, FAQ };
}
