import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// PALETTE — built on ISO 7010 safety-sign colors
// Blue=prescrizione/mandatory · Yellow=avvertimento/warning
// Green=salvataggio/safe · Red=divieto/danger
// Dark neutral canvas = calm reading zone for legal text
// ─────────────────────────────────────────────
const C = {
  ink: '#0c0e10', surface: '#15181c', surface2: '#1c2025', line: '#2a2f35',
  paper: '#ece8dc', paperDim: '#9a978c', paperFaint: '#5f5c54',
  blue: '#0033A0', blueInk: '#dbe6fb', blueDeep: '#001f63',
  yellow: '#FFD500', yellowInk: '#1a1500',
  green: '#00843D', greenInk: '#d6f3e3', greenDeep: '#00592a',
  red: '#D32F2F', redInk: '#fde3e3',
  catA: '#0033A0', catB: '#FFD500',
};

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Spectral:ital@0;1&display=swap";

// ─────────────────────────────────────────────
// MOSO LOGO — minimal safety-shield monogram
// Square, transparent background, LinkedIn-ready
// ─────────────────────────────────────────────
function MosoLogo({size=40}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4 L92 18 V50 C92 76 73 92 50 97 C27 92 8 76 8 50 V18 Z" fill="#0033A0"/>
      <path d="M50 4 L92 18 V50 C92 76 73 92 50 97 V4 Z" fill="#001f63"/>
      <path d="M27 60 L40 35 L48 52 L57 30 L73 60" stroke="#FFD500" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="50" cy="50" r="44" stroke="#ece8dc" strokeWidth="2" opacity="0.25" fill="none"/>
    </svg>
  );
}
const MODS = [
  {id:'A1',cat:'A',order:1,icon:'⚖️',hrs:3,
   title:{it:'Quadro Normativo',en:'Legislative Framework',fa:'چارچوب قانونی'},
   sub:{it:'D.Lgs. 81/08 · Struttura e campo di applicazione',en:'D.Lgs. 81/08 · Structure and scope'},
   arts:['Art. 1','Art. 2','Art. 3','Art. 17'],
   sum:{
     it:`Il D.Lgs. 81/2008 (Testo Unico SSL) è in vigore dal 15/05/2008. Ha abrogato il D.Lgs. 626/1994 e unificato oltre 20 normative previgenti.

Campo di applicazione (Art. 3): tutti i settori privati e pubblici, tutte le tipologie di rischio, senza esclusioni di categoria.

Principio guida: massima sicurezza tecnologicamente fattibile. Il Datore di Lavoro (DL) è il principale soggetto obbligato.

Art. 17 — Obblighi NON delegabili del DL:
• Valutazione di tutti i rischi e redazione del DVR
• Designazione dell'RSPP
Tutti gli altri obblighi (formazione, DPI, emergenze) possono essere delegati ai dirigenti per iscritto.`,
     en:`D.Lgs. 81/2008 (Consolidated Workplace H&S Law) entered into force 15/05/2008. It repealed D.Lgs. 626/1994 and consolidated 20+ previous regulations.

Scope (Art. 3): all private and public sectors, all risk types — no category exclusions.

Guiding principle: maximum technologically feasible safety. The Employer is the primary duty-holder.

Art. 17 — NON-delegable employer duties:
• Risk assessment of all risks + drafting DVR
• Designation of the RSPP
All other duties (training, PPE, emergencies) may be formally delegated to managers.`
   },
   kp:{
     it:['D.Lgs. 81/08 abroga il 626/94 e unifica tutta la normativa previgente SSL','Si applica a tutti i settori (pubblico e privato) e tutte le tipologie di rischio','Art. 2 definisce: DL, dirigente, preposto, lavoratore, RSPP, RLS, MC','Principio: massima sicurezza tecnologicamente fattibile','Art. 17: DVR + designazione RSPP = i 2 soli obblighi NON delegabili del DL'],
     en:['D.Lgs. 81/08 repeals 626/94 and consolidates all previous H&S legislation','Applies to all sectors and all risk types without exception','Art. 2 defines: employer, manager, supervisor, worker, RSPP, RLS, MC','Principle: maximum technologically feasible safety','Art. 17: DVR + RSPP designation = the 2 only NON-delegable duties']
   },
   quiz:[
     {q:{it:'Quale decreto ha abrogato il D.Lgs. 626/1994?',en:'Which decree repealed D.Lgs. 626/1994?'},
      opts:{it:['D.Lgs. 231/2001','D.Lgs. 81/2008','D.Lgs. 152/2006','D.Lgs. 494/1996'],en:['D.Lgs. 231/2001','D.Lgs. 81/2008','D.Lgs. 152/2006','D.Lgs. 494/1996']},
      ans:1,exp:{it:'Il D.Lgs. 81/2008 (in vigore dal 15/05/2008) ha abrogato il D.Lgs. 626/1994 unificando la normativa SSL previgente.',en:'D.Lgs. 81/2008 (in force from 15/05/2008) repealed D.Lgs. 626/1994, consolidating all previous H&S legislation.'}},
     {q:{it:'Quale è un obbligo NON delegabile del datore di lavoro (Art. 17)?',en:'Which is a NON-delegable employer duty (Art. 17)?'},
      opts:{it:['Nomina addetti primo soccorso','Elaborazione DVR e designazione RSPP','Fornitura dei DPI','Redazione piano di emergenza'],en:['Appointing first aid officers','Drafting DVR and designating RSPP','Providing PPE','Emergency plan']},
      ans:1,exp:{it:"Art. 17: il DL non può delegare la valutazione dei rischi/DVR né la designazione dell'RSPP. Tutti gli altri obblighi sono delegabili per iscritto.",en:"Art. 17: employer cannot delegate risk assessment/DVR or RSPP designation. All other duties can be formally delegated."}},
     {q:{it:'Il D.Lgs. 81/08 si applica a:',en:'D.Lgs. 81/08 applies to:'},
      opts:{it:['Solo privati con >15 dipendenti','Solo settori ad alto rischio','Tutti i settori pub. e priv., tutte le tipologie di rischio','Solo lavoratori subordinati'],en:['Only private employers with >15 employees','Only high-risk sectors','All public and private sectors, all risk types','Only employed workers']},
      ans:2,exp:{it:'Art. 3: il decreto si applica a tutti i settori privati e pubblici e a tutte le tipologie di rischio senza eccezioni di categoria lavorativa.',en:'Art. 3: applies to all private and public sectors and all risk types, without worker category exceptions.'}},
     {q:{it:"Chi è il 'preposto' secondo Art. 2?",en:"Who is the 'preposto' (supervisor) per Art. 2?"},
      opts:{it:['Chi dirige l\'impresa','Chi rappresenta i lavoratori per la sicurezza','Chi sovrintende l\'attività e vigila sull\'attuazione degli obblighi','Chi effettua la sorveglianza sanitaria'],en:['Who manages the company','Who represents workers for safety','Who supervises work and monitors compliance with obligations','Who performs health surveillance']},
      ans:2,exp:{it:"Il preposto (Art. 2) è chi sovrintende l'attività lavorativa, verifica l'attuazione degli obblighi e ha il dovere di interrompere l'attività in caso di pericolo grave.",en:'The preposto (Art. 2) supervises work activity, monitors compliance, and has the duty to stop work in case of serious danger.'}}
   ]},

  {id:'A2',cat:'A',order:2,icon:'👥',hrs:4,
   title:{it:'Figure della Sicurezza',en:'Safety Roles & Duties',fa:'نقش‌ها و مسئولیت‌ها'},
   sub:{it:'RSPP, RLS, MC, DL, Dirigente, Preposto — Art. 17-20, 31-34, 50',en:'RSPP, RLS, MC, Employer, Manager, Supervisor — Art. 17-20, 31-34, 50'},
   arts:['Art. 17','Art. 18','Art. 19','Art. 20','Art. 31','Art. 34','Art. 50'],
   sum:{
     it:`Datore di Lavoro (Art. 17-18): obblighi NON delegabili = DVR + nomina RSPP. Obblighi delegabili: formazione, DPI, misure di prevenzione, sorveglianza sanitaria, emergenze.

Dirigente (Art. 18): attua le direttive del DL organizzando le risorse. Ha gli stessi obblighi del DL in quanto applicabili alla sua funzione.

Preposto (Art. 19): sovrintende l'attività lavorativa, verifica l'uso dei DPI, segnala non conformità al DL/dirigente. DEVE interrompere l'attività in caso di pericolo grave e immediato — senza attendere autorizzazione.

RSPP (Art. 31-33): coadiuva il DL nella valutazione dei rischi. Nominato dal DL. Formazione: Mod. A (28h) + B (settoriale) + C (24h, solo per RSPP).

Art. 34: il DL può svolgere direttamente i compiti di RSPP (aziende ≤30 add. in certi settori, previo Mod. A+B).

RLS (Art. 50): eletto/designato dai lavoratori. Diritti: accesso ai luoghi di lavoro, consultazione DVR, riunione periodica, ricorso alle autorità. Nessun potere sanzionatorio.

Medico Competente (Art. 25, 41): sorveglianza sanitaria, collaborazione alla valutazione dei rischi, giudizi di idoneità alla mansione specifica.`,
     en:`Employer (Art. 17-18): NON-delegable = DVR + RSPP appointment. Delegable: training, PPE, prevention measures, health surveillance, emergencies.

Manager (Art. 18): implements employer directives by organizing resources. Same applicable obligations as employer.

Supervisor (Art. 19): supervises work, verifies PPE use, reports non-conformities. MUST stop work in case of serious and immediate danger — without waiting for authorization.

RSPP (Art. 31-33): assists employer in risk assessment. Appointed by employer. Training: Mod. A (28h) + B (sector-specific) + C (24h, RSPP only).

Art. 34: employer can directly act as RSPP (companies ≤30 workers in some sectors, after completing Mod. A+B).

RLS (Art. 50): elected/designated by workers. Rights: access all workplaces, consult DVR, periodic meeting, appeal to authorities. No sanctioning power.

Occupational Physician (Art. 25, 41): health surveillance, risk assessment collaboration, fitness-for-duty judgments.`
   },
   kp:{
     it:['Art. 17: DVR + nomina RSPP = i 2 soli obblighi NON delegabili del DL','Art. 19: il preposto DEVE (non solo può) interrompere l\'attività in caso di pericolo grave immediato','Art. 31: il SPP (Servizio Prevenzione e Protezione) è obbligatorio in ogni azienda','Art. 34: il DL può fare l\'RSPP personalmente (aziende piccole, con formazione adeguata)','Art. 50: l\'RLS è eletto dai lavoratori e ha accesso al DVR e a tutti i luoghi di lavoro'],
     en:['Art. 17: DVR + RSPP designation = the 2 only NON-delegable duties','Art. 19: supervisor MUST (not only can) stop work in case of serious and immediate danger','Art. 31: SPP (Prevention and Protection Service) mandatory in every company','Art. 34: employer can personally act as RSPP (small companies, with proper training)','Art. 50: RLS elected by workers and has access to DVR and all workplaces']
   },
   quiz:[
     {q:{it:"L'RSPP viene nominato da:",en:'The RSPP is appointed by:'},
      opts:{it:['I lavoratori tramite elezione','Il datore di lavoro','Il medico competente','L\'ASL territoriale'],en:['Workers through election','The employer','The occupational physician','The local health authority']},
      ans:1,exp:{it:"Art. 17: la designazione dell'RSPP è un obbligo NON delegabile del DL. Il DL nomina l'RSPP, previa consultazione con l'RLS.",en:"Art. 17: RSPP designation is a NON-delegable employer duty. Employer appoints the RSPP after consulting the RLS."}},
     {q:{it:'Il preposto (Art. 19) può interrompere l\'attività lavorativa:',en:'The supervisor (Art. 19) can stop work:'},
      opts:{it:['Solo se autorizzato per iscritto dal DL','Sempre, a propria discrezione','In caso di pericolo grave e immediato, senza attendere autorizzazione','Solo dopo consulto con il medico competente'],en:['Only if authorized in writing by employer','Always, at their own discretion','In case of serious and immediate danger, without waiting for authorization','Only after consulting the occupational physician']},
      ans:2,exp:{it:"Art. 19: il preposto ha il DOVERE di interrompere l'attività in caso di pericolo grave e immediato. Non è necessaria alcuna autorizzazione preventiva.",en:'Art. 19: supervisor has the DUTY to stop work in case of serious and immediate danger. No prior authorization needed.'}},
     {q:{it:'La formazione obbligatoria per l\'RSPP comprende:',en:'Mandatory training for RSPP includes:'},
      opts:{it:['Solo Modulo A (28h)','Modulo A + B specifico per settore','Modulo A + B + C (quest\'ultimo solo per RSPP)','Nessuna formazione specifica, basta esperienza'],en:['Module A only (28h)','Module A + B (sector-specific)','Module A + B + C (latter for RSPP only)','No specific training, experience sufficient']},
      ans:2,exp:{it:'D.Lgs. 81/08 + Accordo S-R 2006: RSPP = Mod. A (28h) + Mod. B (12-68h, settore ATECO) + Mod. C (24h). L\'ASPP non deve seguire il Mod. C.',en:'D.Lgs. 81/08 + S-R Agreement 2006: RSPP = Mod. A (28h) + Mod. B (12-68h, ATECO sector) + Mod. C (24h). ASPP does not need Mod. C.'}},
     {q:{it:'L\'RLS ha il diritto di:',en:'The RLS has the right to:'},
      opts:{it:['Redigere il DVR al posto del DL','Accedere a tutti i luoghi di lavoro e consultare il DVR','Comminare sanzioni ai lavoratori inadempienti','Nominare e revocare il medico competente'],en:['Draft DVR in place of employer','Access all workplaces and consult the DVR','Issue sanctions to non-compliant workers','Appoint and revoke the occupational physician']},
      ans:1,exp:{it:'Art. 50: l\'RLS può accedere a tutti i luoghi di lavoro, consultare il DVR, ricevere informazioni sui rischi, partecipare alla riunione periodica. Non ha poteri sanzionatori.',en:'Art. 50: RLS can access all workplaces, consult DVR, receive risk information, participate in periodic meeting. No sanctioning powers.'}}
   ]},

  {id:'A3',cat:'A',order:3,icon:'📋',hrs:4,
   title:{it:'Valutazione dei Rischi e DVR',en:'Risk Assessment & DVR',fa:'ارزیابی ریسک و DVR'},
   sub:{it:'Art. 28-29 · Contenuti, firme, aggiornamento, DUVRI',en:'Art. 28-29 · Contents, signatures, updating, DUVRI'},
   arts:['Art. 26','Art. 28','Art. 29'],
   sum:{
     it:`Valutazione dei Rischi (Art. 28): il DL deve valutare TUTTI i rischi per salute e sicurezza — inclusi rischi particolari: stress lavoro-correlato, lavoratrici gestanti, differenze di genere/età/provenienza.

Contenuti DVR (Art. 28 c.2):
• Relazione sulla valutazione di tutti i rischi
• Misure di prevenzione e protezione adottate
• Programma di miglioramento nel tempo
• Procedure per l'attuazione delle misure
• Nominativi di RSPP, RLS, MC
• Mansioni che espongono a rischi specifici

Redazione e firma (Art. 29): DVR firmato da DL + RSPP + MC (ove nominato), con data certa. La firma dell'RLS non è richiesta per la validità. Nuove imprese: DVR entro 90 giorni dall'avvio.

Aggiornamento: modifiche significative al processo produttivo, infortuni significativi, indicazione della sorveglianza sanitaria.

DUVRI (Art. 26): obbligatorio in tutti i contratti di appalto/subappalto quando le attività di più imprese interferiscono nello stesso luogo di lavoro.`,
     en:`Risk Assessment (Art. 28): employer must assess ALL health and safety risks — including specific risks: work-related stress, pregnant workers, gender/age/origin differences.

DVR contents (Art. 28 c.2):
• Report on assessment of all risks
• Prevention and protection measures adopted
• Improvement program over time
• Implementation procedures for measures
• Names of RSPP, RLS, MC
• Roles exposing workers to specific risks

Drafting and signing (Art. 29): DVR signed by employer + RSPP + MC (where appointed), with certified date. RLS signature not required for validity. New companies: DVR within 90 days of starting.

Update: significant production process changes, significant accidents, health surveillance indication.

DUVRI (Art. 26): mandatory in all outsourcing/subcontracting contracts when multiple companies' activities interfere in the same workplace.`
   },
   kp:{
     it:['La VdR deve coprire TUTTI i rischi: fisici, chimici, biologici, organizzativi, stress, differenze di genere/età','DVR firmato da: DL + RSPP + MC (ove nominato) — la firma RLS non è richiesta','Nuove imprese: DVR entro 90 giorni dall\'avvio dell\'attività','DUVRI (Art. 26): obbligatorio in contratti appalto/subappalto con interferenze tra imprese','Il DVR va aggiornato in caso di modifiche significative, infortuni rilevanti o indicazione del MC'],
     en:['Risk assessment must cover ALL risks: physical, chemical, biological, organizational, stress, gender/age differences','DVR signed by: employer + RSPP + MC (where appointed) — RLS signature not required','New companies: DVR within 90 days of starting activity','DUVRI (Art. 26): mandatory in outsourcing/subcontracting with multi-company interferences','DVR updated for significant changes, relevant accidents, or MC indication']
   },
   quiz:[
     {q:{it:'Il DVR deve essere firmato da:',en:'The DVR must be signed by:'},
      opts:{it:['Solo dal datore di lavoro','DL, RSPP e RLS','DL, RSPP e MC (ove nominato)','Da tutti i lavoratori dell\'azienda'],en:['Employer only','Employer, RSPP and RLS','Employer, RSPP and MC (where appointed)','All company workers']},
      ans:2,exp:{it:'Art. 28: il DVR deve recare data certa e la firma del DL, RSPP e MC (ove nominato). La firma dell\'RLS non è richiesta per la validità del documento.',en:'Art. 28: DVR must bear certified date and signatures of employer, RSPP and MC (where appointed). RLS signature not required for document validity.'}},
     {q:{it:'Il DVR deve essere aggiornato in caso di:',en:'DVR must be updated when:'},
      opts:{it:['Ogni nuovo assunto','Ogni 3 anni per legge','Modifiche al processo produttivo, infortuni significativi, indicazione sorveglianza sanitaria','Solo su richiesta dell\'ASL'],en:['Each new hire','Every 3 years by law','Production changes, significant accidents, health surveillance indication','Only on ASL request']},
      ans:2,exp:{it:'Art. 29 c.3: il DVR va aggiornato in caso di modifiche significative al processo/organizzazione, infortuni rilevanti, o quando la sorveglianza sanitaria ne evidenzia la necessità.',en:'Art. 29 c.3: DVR updated for significant changes to process/organization, relevant accidents, or when health surveillance indicates the need.'}},
     {q:{it:'Cosa deve obbligatoriamente contenere il DVR oltre alla valutazione dei rischi?',en:'What must DVR mandatorily contain beyond the risk assessment?'},
      opts:{it:['CV di tutti i lavoratori','Programma di miglioramento e nominativi RSPP/RLS/MC','Contratti assicurativi INAIL','Planimetria aziendale in scala'],en:['CVs of all workers','Improvement program and names of RSPP/RLS/MC','INAIL insurance contracts','Scaled company floor plan']},
      ans:1,exp:{it:'Art. 28 c.2: il DVR deve contenere misure di prevenzione adottate, programma di miglioramento, procedure di attuazione, nominativi di RSPP/RLS/MC, mansioni a rischio specifico.',en:'Art. 28 c.2: DVR must contain prevention measures, improvement program, implementation procedures, names of RSPP/RLS/MC, roles with specific risks.'}},
     {q:{it:'Il DUVRI è obbligatorio:',en:'DUVRI is mandatory:'},
      opts:{it:['Aziende >50 dipendenti','Contratti appalto/subappalto con interferenze tra attività di più imprese','Solo nei cantieri temporanei e mobili','Acquisto di nuovi macchinari'],en:['Companies >50 employees','Outsourcing/subcontracting with multi-company activity interferences','Only in temporary construction sites','Purchase of new machinery']},
      ans:1,exp:{it:'Art. 26: il DUVRI è redatto dal DL committente per eliminare/ridurre i rischi da interferenze tra attività di diverse imprese nello stesso luogo di lavoro.',en:'Art. 26: DUVRI drafted by client employer to eliminate/reduce risks from interferences between different companies in the same workplace.'}}
   ]},

  {id:'A4',cat:'A',order:4,icon:'🎓',hrs:3,
   title:{it:'Formazione e Informazione',en:'Training & Information',fa:'آموزش و اطلاع‌رسانی'},
   sub:{it:'Art. 36-37 · Accordo Stato-Regioni 21/12/2011',en:'Art. 36-37 · State-Regions Agreement 21/12/2011'},
   arts:['Art. 36','Art. 37'],
   sum:{
     it:`Informazione (Art. 36): ogni lavoratore deve ricevere informazioni su rischi aziendali e specifici della propria mansione, procedure di emergenza/PS/antincendio, nominativi di RSPP/MC/RLS.

Formazione (Art. 37): formazione sufficiente e adeguata. Deve avvenire durante l'orario di lavoro, senza oneri economici per i lavoratori. Occasioni obbligatorie: assunzione, cambio mansione, nuove attrezzature, nuove sostanze pericolose.

Accordo Stato-Regioni 21/12/2011:
• Lavoratori rischio basso: 4h generali + 4h specifiche = 8h totali
• Lavoratori rischio medio: 4h + 8h = 12h totali
• Lavoratori rischio alto: 4h + 12h = 16h totali
• Preposti: percorso lavoratori + 8h specifiche aggiuntive
• Dirigenti: 16h (mod. A 6h + mod. B 10h)
• Aggiornamento obbligatorio: ogni 5 anni (6h per lavoratori e preposti)`,
     en:`Information (Art. 36): each worker must receive information on company and job-specific risks, emergency/first aid/fire procedures, names of RSPP/MC/RLS.

Training (Art. 37): sufficient and adequate training. Must occur during working hours, at no cost to workers. Mandatory occasions: hiring, job change, new equipment, new hazardous substances.

State-Regions Agreement 21/12/2011:
• Workers low risk: 4h general + 4h specific = 8h total
• Workers medium risk: 4h + 8h = 12h total
• Workers high risk: 4h + 12h = 16h total
• Supervisors: worker path + 8 additional specific hours
• Managers: 16h (mod. A 6h + mod. B 10h)
• Mandatory update: every 5 years (6h for workers and supervisors)`
   },
   kp:{
     it:['Informazione ≠ Formazione: info = comunicare rischi; formazione = sviluppare competenze operative','Art. 37 c.12: formazione durante orario di lavoro, senza costi per i lavoratori','Accordo 2011: rischio basso=8h, medio=12h, alto=16h (4h generali sempre incluse)','Preposti: percorso lavoratori + 8h aggiuntive specifiche per la funzione','Aggiornamento ogni 5 anni obbligatorio per lavoratori, preposti e dirigenti'],
     en:['Information ≠ Training: info = communicating risks; training = developing operational competencies','Art. 37 c.12: training during working hours, at no cost to workers','Agreement 2011: low=8h, medium=12h, high=16h (4h general always included)','Supervisors: worker path + 8 additional specific hours for the role','Mandatory update every 5 years for workers, supervisors and managers']
   },
   quiz:[
     {q:{it:'Un lavoratore esposto a rischio ALTO deve ricevere almeno:',en:'A HIGH-risk worker must receive at least:'},
      opts:{it:['8 ore (4+4)','12 ore (4+8)','16 ore (4+12)','24 ore'],en:['8 hours (4+4)','12 hours (4+8)','16 hours (4+12)','24 hours']},
      ans:2,exp:{it:'Accordo S-R 21/12/2011: rischio basso=4+4=8h, medio=4+8=12h, alto=4+12=16h. Le 4h generali sono comuni a tutti i livelli.',en:'Agreement 21/12/2011: low=4+4=8h, medium=4+8=12h, high=4+12=16h. The 4h general are common to all risk levels.'}},
     {q:{it:"L'aggiornamento della formazione è obbligatorio ogni:",en:'Training update is mandatory every:'},
      opts:{it:['2 anni','3 anni','5 anni','10 anni'],en:['2 years','3 years','5 years','10 years']},
      ans:2,exp:{it:'Accordo S-R 21/12/2011: aggiornamento ogni 5 anni per lavoratori (6h), preposti (6h) e dirigenti (6h).',en:'Agreement 21/12/2011: update every 5 years for workers (6h), supervisors (6h) and managers (6h).'}},
     {q:{it:'La formazione aggiuntiva specifica per il PREPOSTO è di:',en:'Additional specific training for SUPERVISORS is:'},
      opts:{it:['4 ore','6 ore','8 ore','16 ore'],en:['4 hours','6 hours','8 hours','16 hours']},
      ans:2,exp:{it:'Il preposto deve seguire il percorso lavoratori (in base al rischio) + 8h aggiuntive specifiche per la funzione di preposto (comunicazione, gestione dei conflitti, tecniche di supervisione).',en:'Supervisor must complete worker path (based on risk level) + 8 additional specific hours for the supervisory role (communication, conflict management, supervision techniques).'}},
     {q:{it:'La formazione dei lavoratori deve avvenire:',en:'Worker training must take place:'},
      opts:{it:['Anche fuori orario su richiesta del DL','Durante l\'orario di lavoro, senza oneri per il lavoratore','Solo online con piattaforme certificate','In qualsiasi momento a discrezione del DL'],en:['Also outside hours at employer request','During working hours, at no cost to worker','Only online through certified platforms','At any time at employer discretion']},
      ans:1,exp:{it:'Art. 37 c.12: la formazione deve avvenire durante l\'orario di lavoro e non può comportare oneri economici a carico dei lavoratori.',en:'Art. 37 c.12: training must take place during working hours and cannot involve financial costs for workers.'}}
   ]},

  {id:'A5',cat:'A',order:5,icon:'🦺',hrs:3,
   title:{it:'DPI e Segnaletica di Sicurezza',en:'PPE & Safety Signage',fa:'DPI و علائم ایمنی'},
   sub:{it:'Art. 74-79 (Titolo III) · Art. 161-166 (Titolo V)',en:'Art. 74-79 (Title III) · Art. 161-166 (Title V)'},
   arts:['Art. 74','Art. 76','Art. 77','Art. 78','Art. 161'],
   sum:{
     it:`DPI (Art. 74): qualsiasi attrezzatura destinata ad essere indossata dal lavoratore per proteggerlo da uno o più rischi.

Gerarchia delle misure di prevenzione — i DPI sono SEMPRE l'ultima opzione:
1. Eliminazione del rischio alla fonte
2. Sostituzione con agenti meno pericolosi
3. Misure di protezione collettiva (recinzioni, aspiratori, ecc.)
4. DPI — solo se le precedenti misure sono insufficienti

Categorie DPI (Art. 76):
• Categoria I: rischi minimi (guanti giardinaggio, occhiali sole) — autodichiarazione fabbricante
• Categoria II: rischi intermedi (caschi, occhiali protettivi, guanti lavoro) — esame CE di tipo
• Categoria III: rischi gravi/mortali (imbracature, respiratori, anticaduta) — esame CE di tipo + sorveglianza produzione

Obblighi DL (Art. 77): fornire DPI adeguati al rischio specifico, marcati CE, istruire i lavoratori, garantire manutenzione.
Obblighi lavoratori (Art. 78): usare correttamente i DPI, averne cura, segnalare difetti al DL o preposto.

Segnaletica (Titolo V, Allegato XXV):
• Divieto: sfondo BIANCO, simbolo nero, banda/bordo ROSSO
• Avvertimento: triangolo GIALLO, simbolo nero
• Prescrizione: sfondo BLU, simbolo bianco
• Salvataggio/emergenza: sfondo VERDE, simbolo bianco`,
     en:`PPE (Art. 74): any equipment designed to be worn by workers to protect them from one or more risks.

Prevention measures hierarchy — PPE is ALWAYS the last option:
1. Risk elimination at source
2. Substitution with less hazardous agents
3. Collective protection measures (barriers, extractors, etc.)
4. PPE — only if previous measures are insufficient

PPE Categories (Art. 76):
• Category I: minimal risks (garden gloves, sunglasses) — manufacturer self-declaration
• Category II: intermediate risks (helmets, safety glasses, work gloves) — EC type-examination
• Category III: serious/fatal risks (harnesses, respirators, fall arrest) — EC type-exam + production surveillance

Employer obligations (Art. 77): provide PPE suited to specific risk, CE-marked, train workers, ensure maintenance.
Worker obligations (Art. 78): use PPE correctly, take care of it, report defects to employer or supervisor.

Signage (Title V, Annex XXV):
• Prohibition: WHITE background, black symbol, RED border/band
• Warning: YELLOW triangle, black symbol
• Mandatory: BLUE background, white symbol
• Rescue/emergency: GREEN background, white symbol`
   },
   kp:{
     it:['I DPI sono l\'ULTIMA misura nella gerarchia: dopo eliminazione, sostituzione, protezione collettiva','Categoria III (rischi gravi/mortali): richiede esame CE di tipo + sorveglianza della produzione','Art. 77: il DL fornisce DPI adeguati e marcati CE; garantisce formazione e manutenzione','Art. 78: il lavoratore usa correttamente i DPI e segnala qualsiasi difetto','Segnali: divieto=rosso, avvertimento=giallo, prescrizione=blu, salvataggio=verde'],
     en:['PPE is the LAST measure in hierarchy: after elimination, substitution, collective protection','Category III (serious/fatal risks): requires EC type-examination + production surveillance','Art. 77: employer provides adequate CE-marked PPE; ensures training and maintenance','Art. 78: worker correctly uses PPE and reports any defects','Signs: prohibition=red, warning=yellow, mandatory=blue, rescue=green']
   },
   quiz:[
     {q:{it:'Nella gerarchia delle misure di prevenzione, i DPI si trovano:',en:'In the prevention hierarchy, PPE is placed:'},
      opts:{it:['Al primo posto, più efficaci','Al secondo posto, dopo l\'eliminazione','All\'ultimo posto, dopo eliminazione, sostituzione e protezione collettiva','Al terzo posto, prima della protezione collettiva'],en:['First, most effective','Second, after elimination','Last, after elimination, substitution and collective protection','Third, before collective protection']},
      ans:2,exp:{it:'La gerarchia è: 1) Eliminazione, 2) Sostituzione, 3) Protezione collettiva, 4) DPI. I DPI proteggono solo il singolo lavoratore e non eliminano il rischio alla fonte.',en:'Hierarchy: 1) Elimination, 2) Substitution, 3) Collective protection, 4) PPE. PPE only protects the individual worker and does not eliminate the risk at source.'}},
     {q:{it:'I DPI di Categoria III (rischi gravi/mortali) richiedono:',en:'Category III PPE (serious/fatal risks) requires:'},
      opts:{it:['Solo marcatura CE autodichiarata dal fabbricante','Approvazione del Ministero del Lavoro','Esame CE di tipo da organismo notificato + sorveglianza della produzione','Approvazione dell\'INAIL'],en:['Only CE marking self-declared by manufacturer','Ministry of Labour approval','EC type-examination by notified body + production surveillance','INAIL approval']},
      ans:2,exp:{it:'I DPI di Cat. III (imbracature, respiratori, anticaduta, ecc.) richiedono esame CE di tipo da organismo notificato + sorveglianza della produzione. La sola autodichiarazione non è sufficiente.',en:'Category III PPE (harnesses, respirators, fall arrest, etc.) requires EC type-examination by notified body + production surveillance. Self-declaration alone is not sufficient.'}},
     {q:{it:'Quale colore contraddistingue i segnali di PRESCRIZIONE (obbligo)?',en:'Which color characterizes MANDATORY (prescription) safety signs?'},
      opts:{it:['Rosso','Giallo','Verde','Blu'],en:['Red','Yellow','Green','Blue']},
      ans:3,exp:{it:'I segnali di prescrizione (che impongono un comportamento obbligatorio, come "Indossare il casco") hanno sfondo BLU con simbolo bianco. Rosso=divieto, Giallo=avvertimento, Verde=salvataggio.',en:'Mandatory signs (requiring a specific behavior, e.g. "Wear helmet") have BLUE background with white symbol. Red=prohibition, Yellow=warning, Green=rescue.'}},
     {q:{it:"L'Art. 78 stabilisce che il lavoratore, rispetto ai DPI, deve:",en:'Art. 78 states that workers, regarding PPE, must:'},
      opts:{it:['Scegliere autonomamente i DPI più adatti','Usarli solo quando lo ritiene necessario','Usarli correttamente e segnalare al DL/preposto eventuali difetti','Acquistarli e farsi rimborsare dal DL'],en:['Independently choose most suitable PPE','Use them only when they deem necessary','Use them correctly and report defects to employer/supervisor','Buy them and get reimbursed by employer']},
      ans:2,exp:{it:'Art. 78: i lavoratori devono usare i DPI conformemente alla formazione ricevuta, averne cura, non apportarvi modifiche, e segnalare al DL/preposto difetti o guasti.',en:'Art. 78: workers must use PPE according to training received, take care of it, not modify it, and report defects or malfunctions to employer/supervisor.'}}
   ]},

  {id:'A6',cat:'A',order:6,icon:'🚨',hrs:2,
   title:{it:'Emergenze e Pronto Soccorso',en:'Emergencies & First Aid',fa:'اضطرار و کمک‌های اولیه'},
   sub:{it:'Art. 43-45 · D.M. 388/2003 · Piano di evacuazione',en:'Art. 43-45 · D.M. 388/2003 · Evacuation plan'},
   arts:['Art. 43','Art. 44','Art. 45'],
   sum:{
     it:`Misure di emergenza (Art. 43): il DL designa i lavoratori addetti all'antincendio, all'evacuazione e al pronto soccorso. Devono essere formati e in numero sufficiente.

Diritto di abbandono (Art. 44): il lavoratore che, in caso di pericolo grave, immediato e non evitabile, abbandona il posto di lavoro non può subire pregiudizio alcuno. Non può essere sanzionato disciplinarmente.

Primo soccorso (Art. 45): il DL adotta i provvedimenti necessari tenendo conto della natura dell'attività e delle dimensioni aziendali. Gli addetti ricevono formazione adeguata.

D.M. 388/2003 — Classificazione aziende:
• Gruppo A: attività con particolari rischi o >5 lavoratori esposti → 16h formazione + aggiornamento triennale (6h)
• Gruppo B: >3 lavoratori, non in A → 12h + aggiornamento triennale (4h)
• Gruppo C: ≤3 lavoratori, non in A → 6h + aggiornamento triennale (2h)

Piano di evacuazione: deve indicare vie di esodo, punti di raccolta, addetti alle emergenze, procedure per avvisare i soccorsi.`,
     en:`Emergency measures (Art. 43): employer designates workers assigned to fire-fighting, evacuation and first aid. They must be trained and sufficient in number.

Right to leave (Art. 44): a worker who, in case of serious, immediate and unavoidable danger, leaves the workplace cannot suffer any prejudice and cannot be disciplinarily sanctioned.

First aid (Art. 45): employer takes necessary measures based on nature of activity and company size. Designated workers receive adequate training.

D.M. 388/2003 — Company classification:
• Group A: activities with particular risks or >5 workers exposed → 16h training + triennial update (6h)
• Group B: >3 workers, not in A → 12h + triennial update (4h)
• Group C: ≤3 workers, not in A → 6h + triennial update (2h)

Evacuation plan: must indicate evacuation routes, assembly points, emergency staff, procedures to notify rescue services.`
   },
   kp:{
     it:['Art. 43: il DL nomina e forma gli addetti all\'antincendio, evacuazione e PS in numero adeguato','Art. 44: abbandono del posto per pericolo grave = nessuna sanzione disciplinare possibile','D.M. 388/2003: Gruppo A → 16h + ogni 3 anni 6h; B → 12h+4h; C → 6h+2h','Il piano di emergenza deve essere esposto e aggiornato periodicamente','Gli addetti PS del Gruppo A ricevono la formazione più completa (16h articolata in 3 moduli)'],
     en:['Art. 43: employer appoints and trains fire, evacuation and first aid workers in adequate numbers','Art. 44: leaving workplace due to serious danger = no disciplinary sanction possible','D.M. 388/2003: Group A → 16h + every 3 years 6h; B → 12h+4h; C → 6h+2h','Emergency plan must be posted and periodically updated','Group A first aid workers receive the most complete training (16h in 3 modules)']
   },
   quiz:[
     {q:{it:'Il D.M. 388/2003 classifica le aziende per il pronto soccorso in:',en:'D.M. 388/2003 classifies companies for first aid into:'},
      opts:{it:['Livelli 1-2-3','Classi I-II-III','Gruppi A-B-C','Fasce Alto-Medio-Basso rischio'],en:['Levels 1-2-3','Classes I-II-III','Groups A-B-C','High-Medium-Low risk bands']},
      ans:2,exp:{it:'D.M. 388/2003: Gruppo A (attività pericolose o >5 lavoratori esposti), Gruppo B (>3 lavoratori, non in A), Gruppo C (≤3 lavoratori, non in A).',en:'D.M. 388/2003: Group A (dangerous activities or >5 exposed workers), Group B (>3 workers, not in A), Group C (≤3 workers, not in A).'}},
     {q:{it:'Un lavoratore del Gruppo A deve ricevere formazione PS di:',en:'A Group A first aid worker must receive training of:'},
      opts:{it:['6 ore','12 ore','16 ore iniziali + 6h aggiornamento ogni 3 anni','24 ore senza aggiornamento'],en:['6 hours','12 hours','16 initial hours + 6h update every 3 years','24 hours with no update']},
      ans:2,exp:{it:'D.M. 388/2003: Gruppo A = 16h di formazione iniziale (3 moduli) + aggiornamento ogni 3 anni di 6h. Gruppo B = 12h+4h. Gruppo C = 6h+2h.',en:'D.M. 388/2003: Group A = 16h initial training (3 modules) + 6h update every 3 years. Group B = 12h+4h. Group C = 6h+2h.'}},
     {q:{it:'Chi designa i lavoratori addetti alla gestione delle emergenze?',en:'Who designates workers assigned to emergency management?'},
      opts:{it:['Il medico competente','L\'RLS','Il datore di lavoro','I Vigili del Fuoco'],en:['The occupational physician','The RLS','The employer','The Fire Brigade']},
      ans:2,exp:{it:"Art. 43: il datore di lavoro designa preventivamente i lavoratori incaricati dell'attuazione delle misure di prevenzione incendi, evacuazione, salvataggio, primo soccorso e gestione dell'emergenza.",en:'Art. 43: employer preventively designates workers assigned to fire prevention, evacuation, rescue, first aid and emergency management.'}},
     {q:{it:'Secondo Art. 44, un lavoratore che abbandona il posto per pericolo grave può:',en:'Per Art. 44, a worker who leaves their post due to serious danger can:'},
      opts:{it:['Essere licenziato per abbandono del posto','Ricevere una sanzione disciplinare proporzionata','Non subire pregiudizio alcuno né sanzioni disciplinari','Essere sospeso temporaneamente dal lavoro'],en:['Be dismissed for abandoning post','Receive a proportionate disciplinary sanction','Suffer no prejudice or disciplinary sanction','Be temporarily suspended from work']},
      ans:2,exp:{it:"Art. 44 c.1: il lavoratore che abbandona il posto in caso di pericolo grave, immediato e non evitabile 'non può subire pregiudizio alcuno'. Nessuna sanzione disciplinare è possibile.",en:"Art. 44 c.1: a worker abandoning their post due to serious, immediate and unavoidable danger 'cannot suffer any prejudice'. No disciplinary sanction is possible."}}
   ]},

  {id:'A7',cat:'A',order:7,icon:'🏥',hrs:3,
   title:{it:'Sorveglianza Sanitaria',en:'Health Surveillance',fa:'مراقبت بهداشتی'},
   sub:{it:'Art. 41-42 · MC, visite mediche, giudizi di idoneità',en:'Art. 41-42 · Physician, medical visits, fitness judgments'},
   arts:['Art. 25','Art. 38','Art. 39','Art. 41','Art. 42'],
   sum:{
     it:`Sorveglianza sanitaria (Art. 41): obbligatoria solo nei casi previsti dalla legge (esposizione a rumore, vibrazioni, agenti chimici/biologici, MMC, VDT, lavoro notturno, ecc.). Non è universale.

Tipologie di visite mediche:
• Preventive: prima dell'assunzione o del cambio mansione
• Periodiche: per controllare lo stato di salute e l'idoneità nel tempo
• Su richiesta del lavoratore: se correlate ai rischi professionali (a giudizio del MC)
• In occasione del cambio mansione
• Alla cessazione del rapporto: per agenti cancerogeni e biologici

Giudizi di idoneità (Art. 41 c.6):
• Idoneo alla mansione specifica
• Idoneo con prescrizioni/limitazioni (temporanee o permanenti)
• Inidoneo temporaneo
• Inidoneo permanente

Ricorso (Art. 41 c.9): contro il giudizio del MC, sia il lavoratore che il DL possono ricorrere all'organo di vigilanza territorialmente competente entro 30 giorni.

Nomina MC (Art. 39): nominato dal DL quando è prevista la sorveglianza sanitaria. La cartella sanitaria e di rischio è riservata: il lavoratore ne può richiedere copia alla cessazione del rapporto.`,
     en:`Health surveillance (Art. 41): mandatory only in legally required cases (exposure to noise, vibration, chemical/biological agents, MMC, VDT, night work, etc.). Not universal.

Types of medical visits:
• Preventive: before hiring or job change
• Periodic: to monitor health status and fitness over time
• Upon worker request: if related to professional risks (at MC's judgment)
• Upon job change
• At end of employment: for carcinogenic and biological agents

Fitness judgments (Art. 41 c.6):
• Fit for specific duty
• Partially fit with restrictions/limitations (temporary or permanent)
• Temporarily unfit
• Permanently unfit

Appeal (Art. 41 c.9): against the MC's judgment, both worker and employer can appeal to the territorial supervisory authority within 30 days.

MC appointment (Art. 39): appointed by employer when health surveillance is required. Health and risk records are confidential: worker may request copy upon leaving.`
   },
   kp:{
     it:['La sorveglianza sanitaria è obbligatoria SOLO dove previsto dalla legge, non per tutti i lavoratori','Art. 41: il MC può effettuare visite su richiesta del lavoratore se correlate ai rischi professionali','4 giudizi possibili: idoneo, idoneo con prescrizioni, inidoneo temporaneo, inidoneo permanente','Il ricorso avverso il giudizio del MC va presentato entro 30 giorni all\'organo di vigilanza territoriale','La cartella sanitaria è riservata; il lavoratore può richiederne copia alla cessazione'],
     en:['Health surveillance mandatory ONLY where required by law, not for all workers','Art. 41: MC can perform visits upon worker request if related to professional risks','4 possible judgments: fit, partially fit (with restrictions), temporarily unfit, permanently unfit','Appeal against MC judgment within 30 days to territorial supervisory authority','Health record is confidential; worker can request copy upon leaving']
   },
   quiz:[
     {q:{it:'La sorveglianza sanitaria è obbligatoria:',en:'Health surveillance is mandatory:'},
      opts:{it:['Per tutti i lavoratori indistintamente','Solo nelle aziende >15 dipendenti','Solo per i lavoratori esposti a specifici rischi previsti dalla legge','Solo per i lavoratori con contratto a tempo indeterminato'],en:['For all workers without exception','Only in companies >15 employees','Only for workers exposed to specific legally-required risks','Only for permanent contract workers']},
      ans:2,exp:{it:'Art. 41: la sorveglianza sanitaria è effettuata nei casi previsti dalla normativa (esposizione a rumore, vibrazioni, agenti chimici, biologici, cancerogeni, MMC, VDT, lavoro notturno, ecc.), non per tutti.',en:'Art. 41: health surveillance performed in legally required cases (exposure to noise, vibration, chemical, biological, carcinogenic agents, MMC, VDT, night work, etc.), not universally.'}},
     {q:{it:'Il medico competente viene nominato da:',en:'The occupational physician is appointed by:'},
      opts:{it:["L'ASL territoriale","Il datore di lavoro","L'RSPP","I lavoratori tramite RLS"],en:['The local health authority','The employer','The RSPP','Workers through RLS']},
      ans:1,exp:{it:"Art. 39 c.1: il medico competente è nominato dal datore di lavoro nei casi in cui è prevista la sorveglianza sanitaria. È uno degli obblighi delegabili del DL.",en:'Art. 39 c.1: occupational physician is appointed by the employer in cases where health surveillance is required. It is one of the employer\'s delegable duties.'}},
     {q:{it:'Entro quanto tempo può essere presentato ricorso avverso il giudizio del MC?',en:'Within what time can an appeal be made against the MC judgment?'},
      opts:{it:['15 giorni','30 giorni','60 giorni','90 giorni'],en:['15 days','30 days','60 days','90 days']},
      ans:1,exp:{it:"Art. 41 c.9: avverso i giudizi del MC è ammesso ricorso all'organo di vigilanza territorialmente competente entro trenta giorni dalla comunicazione del giudizio.",en:"Art. 41 c.9: appeal against MC judgment to territorial supervisory authority within thirty days of judgment communication."}},
     {q:{it:'Quali sono i possibili giudizi di idoneità emessi dal MC?',en:'What are the possible fitness judgments issued by the MC?'},
      opts:{it:['Solo idoneo o inidoneo','Idoneo, idoneo con prescrizioni, inidoneo temporaneo, inidoneo permanente','Idoneo, idoneo con DPI, necessita ulteriori accertamenti','Solo idoneo o sospeso per accertamenti'],en:['Only fit or unfit','Fit, partially fit (with restrictions), temporarily unfit, permanently unfit','Fit, fit with PPE, needs further tests','Only fit or suspended for tests']},
      ans:1,exp:{it:'Art. 41 c.6: il MC può esprimere 4 giudizi: idoneo alla mansione, idoneo con prescrizioni/limitazioni (temp. o perm.), inidoneo temporaneo, inidoneo permanente. Il giudizio è comunicato sia al DL che al lavoratore.',en:'Art. 41 c.6: MC can issue 4 judgments: fit for duty, fit with restrictions/limitations (temp or perm), temporarily unfit, permanently unfit. Judgment communicated to both employer and worker.'}}
   ]},

  // ─── MODULO B ───
  {id:'B1',cat:'B',order:8,icon:'🏭',hrs:2,
   title:{it:'Luoghi di Lavoro — Logistica',en:'Workplaces — Logistics',fa:'محل‌های کار — لجستیک'},
   sub:{it:'Art. 62-68 · Allegato IV · Magazzini e aree operative',en:'Art. 62-68 · Annex IV · Warehouses and operational areas'},
   arts:['Art. 62','Art. 63','Art. 64','Art. 65','Art. 67'],
   sum:{
     it:`Il Titolo II (Art. 62-68) stabilisce i requisiti minimi per i luoghi di lavoro.

Requisiti principali (Allegato IV):
• Altezza minima: 3 m (2,70 m per uffici; 2,50 m con deroga prefettizia)
• Cubatura minima: 10 m³ per lavoratore
• Superficie minima: 2 m² per lavoratore
• Illuminazione: naturale preferibile; artificiale integrativa se necessario
• Temperatura: adeguata alla stagione e al tipo di lavoro; protezione da eccessi

Vie di circolazione (Allegato IV):
• Larghezza minima per pedoni: 80 cm
• Corridoi con traffico misto pedoni+veicoli: larghezza adeguata ai mezzi + margine sicurezza
• Separazione obbligatoria tra percorsi pedonali e corsie veicoli

Specifico per magazzini (contesto logistico):
• Segnalazione a terra delle corsie pedonali (colore giallo)
• Protezioni agli angoli e strutture scaffali (bugnature, protezioni laterali)
• Sistemi di ancoraggio e fissaggio delle scaffalature al suolo
• Vie di uscita sgombere, segnalate, sempre accessibili dall'interno`,
     en:`Title II (Art. 62-68) sets minimum requirements for workplaces.

Main requirements (Annex IV):
• Minimum height: 3m (2.70m for offices; 2.50m with prefecture exemption)
• Minimum volume: 10 m³ per worker
• Minimum surface area: 2 m² per worker
• Lighting: natural preferred; supplementary artificial if needed
• Temperature: appropriate for season and work type; protection from extremes

Circulation routes (Annex IV):
• Minimum width for pedestrians: 80cm
• Mixed pedestrian+vehicle corridors: width adequate for vehicles + safety margin
• Mandatory separation between pedestrian routes and vehicle lanes

Specific to warehouses (logistics context):
• Ground marking of pedestrian lanes (yellow color)
• Corner and shelf structure protection (rubber guards, lateral guards)
• Shelf anchoring and fixing systems to floor
• Emergency exits clear, signposted, always accessible from inside`
   },
   kp:{
     it:['Altezza minima luoghi di lavoro: 3 m (2,70 m uffici; 2,50 m con deroga)','Cubatura minima: 10 m³/lavoratore; superficie: 2 m²/lavoratore','Corsie pedonali in magazzino: obbligatorie, segnalate a terra in giallo','Le vie di emergenza devono essere sempre sgombere e apribili dall\'interno senza chiave','Art. 63: il DL deve assicurare conformità ai requisiti dell\'Allegato IV'],
     en:['Minimum workplace height: 3m (2.70m offices; 2.50m with prefecture exemption)','Minimum volume: 10 m³/worker; surface area: 2 m²/worker','Warehouse pedestrian lanes: mandatory, ground-marked in yellow','Emergency exits must always be clear and openable from inside without key','Art. 63: employer must ensure compliance with Annex IV requirements']
   },
   quiz:[
     {q:{it:"L'altezza minima di un luogo di lavoro (Allegato IV) è:",en:'Minimum workplace height (Annex IV) is:'},
      opts:{it:['2 m','2,50 m','3 m','4 m'],en:['2m','2.50m','3m','4m']},
      ans:2,exp:{it:"Allegato IV: altezza minima 3 m per i luoghi di lavoro. Per gli uffici è ammessa una riduzione a 2,70 m. Con autorizzazione prefettizia si può scendere a 2,50 m. I magazzini automatizzati possono avere disposizioni specifiche.",en:'Annex IV: minimum height 3m for workplaces. For offices, 2.70m is permitted. With prefecture authorization, 2.50m is allowed.'}},
     {q:{it:'La cubatura minima per ogni lavoratore negli ambienti di lavoro è:',en:'Minimum volume per worker in work environments is:'},
      opts:{it:['5 m³','8 m³','10 m³','15 m³'],en:['5 m³','8 m³','10 m³','15 m³']},
      ans:2,exp:{it:'Allegato IV: cubatura minima 10 m³ per lavoratore negli ambienti chiusi. La superficie minima è di 2 m² per lavoratore.',en:'Annex IV: minimum 10 m³ volume per worker in enclosed environments. Minimum surface area is 2 m² per worker.'}},
     {q:{it:'Nei magazzini con traffico misto, le corsie pedonali devono essere:',en:'In warehouses with mixed traffic, pedestrian lanes must be:'},
      opts:{it:['Solo segnalate con cartelli verticali','Chiaramente delimitate e segnalate a terra, separate dalle corsie dei mezzi','Separate da barriere fisiche alte almeno 2 m','Non necessarie se i carrelli sono sotto i 5 km/h'],en:['Only marked with vertical signs','Clearly delimited and ground-marked, separated from vehicle lanes','Separated by physical barriers at least 2m high','Not necessary if forklifts are below 5 km/h']},
      ans:1,exp:{it:'Allegato IV e norme tecniche: nei luoghi con traffico misto pedoni/veicoli, le corsie pedonali devono essere chiaramente delimitate (tipicamente linee gialle sul pavimento), illuminate e separate dai percorsi dei veicoli.',en:'Annex IV and technical standards: in places with mixed pedestrian/vehicle traffic, pedestrian lanes must be clearly delimited (typically yellow floor lines), lit and separated from vehicle paths.'}},
     {q:{it:'Le vie di uscita e di emergenza devono essere:',en:'Emergency exits must be:'},
      opts:{it:['Sempre chiuse a chiave per la sicurezza','Apribili solo dal personale autorizzato','Sgombere, accessibili e segnalate in ogni momento','Aperte solo durante l\'orario di lavoro'],en:['Always locked for security','Openable only by authorized personnel','Clear, accessible and signposted at all times','Open only during working hours']},
      ans:2,exp:{it:'Le vie di uscita devono essere sempre sgombere da ostacoli, apribili dall\'interno senza chiave, segnalate con segnaletica di salvataggio (sfondo verde) e illuminate, anche in caso di emergenza.',en:'Emergency exits must always be clear of obstacles, openable from inside without key, signposted with rescue signage (green background) and lit, including during emergencies.'}}
   ]},

  {id:'B2',cat:'B',order:9,icon:'📦',hrs:3,
   title:{it:'Movimentazione Manuale dei Carichi',en:'Manual Handling of Loads',fa:'جابجایی دستی بار'},
   sub:{it:'Art. 167-171 · Allegato XXXIII · Metodo NIOSH',en:'Art. 167-171 · Annex XXXIII · NIOSH method'},
   arts:['Art. 167','Art. 168','Art. 169','Art. 170','Art. 171'],
   sum:{
     it:`Definizione MMC (Art. 167): operazioni di trasporto o sostegno di un carico con le mani o con la forza del corpo: sollevamento, deposizione, spinta, traino, portamento, spostamento.

Rischio principale: sovraccarico biomeccanico del rachide → rachialgia, ernie discali, patologie muscolo-scheletriche. Tra i disturbi professionali più diffusi nel settore logistica.

Metodo NIOSH — Peso limite raccomandato in condizioni ideali (Allegato XXXIII):
• Uomini adulti: 25 kg
• Donne adulte: 20 kg
• Lavoratori <18 anni: 15 kg (indipendentemente dal sesso)

I coefficienti moltiplicativi NIOSH (altezza di presa, dislocazione verticale, asimmetria, frequenza, tipo di presa, distanza orizzontale) sono tutti ≤ 1: riducono il peso limite al diminuire delle condizioni ideali.

Obblighi del DL (Art. 168):
• Valutare i rischi tenendo conto di: caratteristiche del carico, sforzo fisico richiesto, caratteristiche dell'ambiente, esigenze dell'attività
• Adottare misure organizzative (rotazione, pause)
• Fornire ausili meccanici (transpallet, carrelli, ecc.)
• Garantire formazione e informazione`,
     en:`MMC definition (Art. 167): operations of transporting or supporting a load by hand or bodily force: lifting, lowering, pushing, pulling, carrying, moving.

Main risk: biomechanical spinal overload → lower back pain, disc herniation, musculoskeletal disorders. Among the most common occupational disorders in logistics.

NIOSH Method — Recommended weight limit in ideal conditions (Annex XXXIII):
• Adult males: 25 kg
• Adult females: 20 kg
• Workers <18 years: 15 kg (regardless of gender)

NIOSH multiplicative coefficients (grip height, vertical displacement, asymmetry, frequency, grip type, horizontal distance) are all ≤ 1: they reduce the weight limit as conditions deviate from ideal.

Employer obligations (Art. 168):
• Assess risks considering: load characteristics, physical effort required, environmental characteristics, activity requirements
• Adopt organizational measures (rotation, breaks)
• Provide mechanical aids (pallet trucks, trolleys, etc.)
• Ensure training and information`
   },
   kp:{
     it:['MMC include: sollevamento, deposizione, spinta, traino, portamento, spostamento (Art. 167)','Rischio principale MMC: sovraccarico biomeccanico del rachide (lombalgia, ernie)','NIOSH in condizioni ideali: uomini 25 kg, donne 20 kg, <18 anni 15 kg','I coefficienti NIOSH sono tutti ≤ 1 e riducono il peso limite nelle condizioni reali','Art. 168: il DL deve fornire ausili meccanici, adottare misure organizzative e garantire formazione'],
     en:['MMC includes: lifting, lowering, pushing, pulling, carrying, moving (Art. 167)','Main MMC risk: biomechanical spinal overload (back pain, disc herniation)','NIOSH in ideal conditions: males 25kg, females 20kg, <18 years 15kg','NIOSH coefficients are all ≤ 1 and reduce weight limit in real conditions','Art. 168: employer must provide mechanical aids, adopt organizational measures and ensure training']
   },
   quiz:[
     {q:{it:'Il peso limite NIOSH per un uomo adulto in condizioni ideali è:',en:'NIOSH weight limit for an adult male in ideal conditions is:'},
      opts:{it:['15 kg','20 kg','25 kg','30 kg'],en:['15 kg','20 kg','25 kg','30 kg']},
      ans:2,exp:{it:'Allegato XXXIII: peso di riferimento 25 kg per uomini adulti, 20 kg per donne adulte, in condizioni ideali. Questo valore si riduce applicando i coefficienti NIOSH in base alle condizioni reali.',en:'Annex XXXIII: reference weight 25kg for adult males, 20kg for adult females, in ideal conditions. This value decreases by applying NIOSH coefficients based on real conditions.'}},
     {q:{it:'Il rischio principale della MMC è:',en:'The main MMC risk is:'},
      opts:{it:['Caduta del carico sui piedi','Sovraccarico biomeccanico del rachide (rachialgia e patologie muscoloscheletriche)','Rischio cardiovascolare da sforzo','Infezioni da contatto con superfici'],en:['Load falling on feet','Biomechanical spinal overload (back pain and musculoskeletal disorders)','Cardiovascular risk from exertion','Infections from surface contact']},
      ans:1,exp:{it:'Il rischio principale della MMC è il sovraccarico biomeccanico del rachide, che può causare lombalgia, ernie discali e altre patologie muscoloscheletriche. È tra i disturbi professionali più diffusi nel settore logistico.',en:'The main MMC risk is biomechanical spinal overload, causing lower back pain, disc herniation and other musculoskeletal disorders. Among the most common occupational disorders in logistics.'}},
     {q:{it:'I coefficienti moltiplicativi del metodo NIOSH sono:',en:'NIOSH multiplicative coefficients are:'},
      opts:{it:['Sempre >1 e aumentano il peso limite','Sempre ≤1 e riducono il peso limite in base alle condizioni reali','Fissi e uguali per tutti i lavoratori','Si applicano solo per carichi >30 kg'],en:['Always >1 and increase weight limit','Always ≤1 and reduce weight limit based on real conditions','Fixed and equal for all workers','Applied only for loads >30 kg']},
      ans:1,exp:{it:'I coefficienti NIOSH (altezza presa, dislocazione, asimmetria, frequenza, presa, distanza) sono tutti ≤1. Il valore 1 corrisponde alla condizione ideale; condizioni peggiori danno coefficienti <1, riducendo il peso limite.',en:'NIOSH coefficients (grip height, displacement, asymmetry, frequency, grip, distance) are all ≤1. Value 1 = ideal condition; worse conditions give coefficients <1, reducing weight limit.'}},
     {q:{it:'Per i lavoratori di età inferiore a 18 anni, il limite NIOSH è:',en:'For workers under 18 years of age, the NIOSH limit is:'},
      opts:{it:['10 kg','12 kg','15 kg','18 kg'],en:['10 kg','12 kg','15 kg','18 kg']},
      ans:2,exp:{it:'Allegato XXXIII: limite di 15 kg per lavoratori <18 anni, indipendentemente dal sesso, a tutela del sistema muscoloscheletrico in sviluppo.',en:'Annex XXXIII: 15 kg limit for workers <18 years, regardless of gender, to protect the developing musculoskeletal system.'}}
   ]},

  {id:'B3',cat:'B',order:10,icon:'🔊',hrs:3,
   title:{it:'Rischi Fisici: Rumore e Vibrazioni',en:'Physical Risks: Noise & Vibrations',fa:'صدا و لرزش'},
   sub:{it:'Art. 188-201 (Titolo VIII) · Valori limite e d\'azione',en:'Art. 188-201 (Title VIII) · Limit and action values'},
   arts:['Art. 188','Art. 189','Art. 192','Art. 193','Art. 196'],
   sum:{
     it:`RUMORE (Art. 188-200) — misurato in dB(A) come LEX,8h (esposizione quotidiana personale):

Tre soglie fondamentali:
• Valore inferiore di azione: LEX = 80 dB(A) → informazione e formazione; DPI (otoprotettori) disponibili su richiesta ma NON obbligatori
• Valore superiore di azione: LEX = 85 dB(A) → sorveglianza sanitaria obbligatoria; uso DPI obbligatorio; segnalazione e delimitazione zone rumorose; misure tecniche/organizzative
• Valore limite di esposizione: LEX = 87 dB(A) → non superabile mai, anche tenuto conto dell'attenuazione dei DPI

La valutazione del rischio rumore va aggiornata ogni 4 anni (ogni 2 anni se cambiano le condizioni).

VIBRAZIONI (Art. 201-210):
HAV — mano-braccio (utensili vibranti, ecc.):
• Valore d'azione: 2,5 m/s²  |  Valore limite: 5,0 m/s²

WBV — corpo intero (conducenti carrelli elevatori, veicoli industriali):
• Valore d'azione: 0,5 m/s²  |  Valore limite: 1,15 m/s²

Rilevanza in logistica: rumore da carrelli elevatori e nastri trasportatori; WBV per carrellisti su pavimentazioni irregolari.`,
     en:`NOISE (Art. 188-200) — measured in dB(A) as LEX,8h (personal daily exposure):

Three key thresholds:
• Lower action value: LEX = 80 dB(A) → information and training; PPE (hearing protectors) available on request but NOT mandatory
• Upper action value: LEX = 85 dB(A) → mandatory health surveillance; mandatory PPE use; noisy zone marking and delimitation; technical/organizational measures
• Exposure limit value: LEX = 87 dB(A) → must never be exceeded, accounting for PPE attenuation

Noise risk assessment updated every 4 years (every 2 years if conditions change).

VIBRATIONS (Art. 201-210):
HAV — hand-arm (vibrating tools, etc.):
• Action value: 2.5 m/s²  |  Limit value: 5.0 m/s²

WBV — whole-body (forklift operators, industrial vehicles):
• Action value: 0.5 m/s²  |  Limit value: 1.15 m/s²

Logistics relevance: noise from forklifts and conveyors; WBV for operators on uneven flooring.`
   },
   kp:{
     it:['3 soglie rumore: 80 dB(A) azione inf. → 85 dB(A) azione sup. → 87 dB(A) limite max','A 85 dB(A): sorveglianza sanitaria + uso obbligatorio otoprotettori + segnalazione zone','A 87 dB(A): valore non superabile neanche con i DPI più efficaci','WBV rilevante per carrellisti: azione 0,5 m/s², limite 1,15 m/s²','HAV rilevante per uso utensili vibranti: azione 2,5 m/s², limite 5,0 m/s²'],
     en:['3 noise thresholds: 80 dB(A) lower action → 85 dB(A) upper action → 87 dB(A) max limit','At 85 dB(A): health surveillance + mandatory hearing PPE + zone marking','At 87 dB(A): cannot be exceeded even with most effective PPE','WBV relevant for forklift operators: action 0.5 m/s², limit 1.15 m/s²','HAV relevant for vibrating tool use: action 2.5 m/s², limit 5.0 m/s²']
   },
   quiz:[
     {q:{it:"Il valore superiore d'azione per il rumore, che obbliga all'uso degli otoprotettori, è:",en:'Upper action value for noise, making hearing protectors mandatory, is:'},
      opts:{it:['75 dB(A)','80 dB(A)','85 dB(A)','87 dB(A)'],en:['75 dB(A)','80 dB(A)','85 dB(A)','87 dB(A)']},
      ans:2,exp:{it:"Art. 192: al superamento di LEX,8h = 85 dB(A), il DL adotta misure organizzative per ridurre l'esposizione, segnala e delimita le zone e garantisce l'uso obbligatorio degli otoprotettori. A 80 dB(A) i DPI sono disponibili ma non obbligatori.",en:'Art. 192: exceeding LEX,8h = 85 dB(A), employer adopts organizational measures, marks/delimits zones and ensures mandatory use of hearing protectors. At 80 dB(A), PPE is available but not mandatory.'}},
     {q:{it:'Il valore limite di esposizione al rumore (non superabile) è:',en:'Noise exposure limit value (cannot be exceeded) is:'},
      opts:{it:['80 dB(A)','85 dB(A)','87 dB(A)','90 dB(A)'],en:['80 dB(A)','85 dB(A)','87 dB(A)','90 dB(A)']},
      ans:2,exp:{it:"Art. 189: il valore limite di esposizione è LEX,8h = 87 dB(A). Non può essere mai superato, tenuto conto dell'attenuazione fornita dai DPI. Se superato, il DL identifica le cause e agisce immediatamente.",en:'Art. 189: exposure limit value is LEX,8h = 87 dB(A). Can never be exceeded, accounting for PPE attenuation. If exceeded, employer identifies causes and acts immediately.'}},
     {q:{it:'Per le vibrazioni al corpo intero (WBV), il valore d\'azione giornaliero è:',en:'For whole-body vibration (WBV), the daily action value is:'},
      opts:{it:['0,5 m/s²','1,0 m/s²','2,5 m/s²','5,0 m/s²'],en:['0.5 m/s²','1.0 m/s²','2.5 m/s²','5.0 m/s²']},
      ans:0,exp:{it:'Per WBV (corpo intero): valore d\'azione = 0,5 m/s², valore limite = 1,15 m/s². Per HAV (mano-braccio): azione = 2,5 m/s², limite = 5,0 m/s². Le WBV sono rilevanti per i conduttori di carrelli elevatori.',en:"For WBV (whole-body): action value = 0.5 m/s², limit value = 1.15 m/s². For HAV (hand-arm): action = 2.5 m/s², limit = 5.0 m/s². WBV is relevant for forklift operators."}},
     {q:{it:"Al superamento del valore inferiore d'azione per il rumore (80 dB(A)), il DL deve:",en:'When exceeding lower action value for noise (80 dB(A)), employer must:'},
      opts:{it:['Sospendere immediatamente l\'attività','Garantire disponibilità di otoprotettori e fornire informazione e formazione','Istituire la sorveglianza sanitaria obbligatoria','Vietare l\'ingresso nelle zone rumorose'],en:['Immediately stop activity','Ensure hearing protectors availability and provide information and training','Establish mandatory health surveillance','Prohibit entry to noisy zones']},
      ans:1,exp:{it:"A 80 dB(A) (valore inferiore d'azione): il DL mette a disposizione otoprotettori (uso facoltativo) e fornisce formazione e informazione. Sorveglianza sanitaria e uso obbligatorio dei DPI scattano solo a 85 dB(A).",en:'At 80 dB(A) (lower action value): employer makes hearing protectors available (voluntary use) and provides training and information. Health surveillance and mandatory PPE use only kick in at 85 dB(A).'}}
   ]},

  {id:'B4',cat:'B',order:11,icon:'🚜',hrs:3,
   title:{it:'Attrezzature di Lavoro',en:'Work Equipment',fa:'تجهیزات کاری'},
   sub:{it:'Art. 69-73 · Carrelli elevatori · Accordo S-R 22/02/2012',en:'Art. 69-73 · Forklifts · State-Regions Agreement 22/02/2012'},
   arts:['Art. 69','Art. 70','Art. 71','Art. 72','Art. 73'],
   sum:{
     it:`Definizione (Art. 69): qualsiasi macchina, apparecchio, utensile o impianto destinato ad essere usato durante il lavoro.

Requisiti di sicurezza (Art. 70): le attrezzature devono essere conformi alle direttive CE applicabili (es. Direttiva Macchine 2006/42/CE) e recare la marcatura CE. Devono essere adeguate al lavoro da svolgere.

Obblighi del DL (Art. 71):
• Mettere a disposizione attrezzature idonee al lavoro
• Garantire manutenzione in buono stato di funzionamento
• Conservare la documentazione delle manutenzioni e verifiche
• Assicurare formazione e addestramento specifico per attrezzature pericolose

CARRELLI ELEVATORI — Accordo Stato-Regioni 22/02/2012:
• Abilitazione obbligatoria per tutti gli operatori di carrelli semoventi con conducente a bordo
• Formazione: Modulo giuridico-normativo (4h) + Modulo tecnico (4h) + Modulo pratico (4h) = 12h totali
• Aggiornamento quinquennale: 4 ore ogni 5 anni
• Il controllo pre-utilizzo (livelli, freni, cinture, forche, segnalatori) è responsabilità dell'operatore

Manutenzione (Art. 71 c.4): le attrezzature soggette a rischi di deterioramento devono essere sottoposte a verifiche periodiche documentate.`,
     en:`Definition (Art. 69): any machine, apparatus, tool or installation intended to be used during work.

Safety requirements (Art. 70): equipment must comply with applicable EU directives (e.g. Machinery Directive 2006/42/EC) and bear CE marking. Must be suitable for the task.

Employer obligations (Art. 71):
• Provide equipment suitable for the task
• Ensure maintenance in good working order
• Keep maintenance and verification documentation
• Ensure specific training and instruction for dangerous equipment

FORKLIFTS — State-Regions Agreement 22/02/2012:
• Mandatory qualification for all operators of self-propelled equipment with onboard driver
• Training: Legal-regulatory module (4h) + Technical module (4h) + Practical module (4h) = 12h total
• 5-year update: 4 hours every 5 years
• Pre-use check (levels, brakes, belts, forks, signals) is operator's responsibility

Maintenance (Art. 71 c.4): equipment subject to deterioration risks must undergo documented periodic checks.`
   },
   kp:{
     it:['Art. 70: tutte le attrezzature devono essere conformi alle direttive CE applicabili (marcatura CE)','Art. 71: il DL garantisce manutenzione e conserva documentazione di verifiche e ispezioni','Accordo S-R 22/02/2012: abilitazione obbligatoria per tutti i carrellisti (carrelli con conducente a bordo)','Formazione carrellisti: 12h (4h giuridico + 4h tecnico + 4h pratico) + aggiornamento 4h ogni 5 anni','Controllo pre-utilizzo del carrello: responsabilità dell\'operatore prima di ogni uso'],
     en:['Art. 70: all equipment must comply with applicable EU directives (CE marking)','Art. 71: employer ensures maintenance and keeps verification/inspection documentation','Agreement 22/02/2012: mandatory qualification for all forklift operators (equipment with onboard driver)','Forklift training: 12h (4h legal + 4h technical + 4h practical) + 4h update every 5 years','Pre-use forklift check: operator responsibility before each use']
   },
   quiz:[
     {q:{it:"L'Accordo Stato-Regioni 22/02/2012 stabilisce che per guidare un carrello elevatore è necessaria:",en:'State-Regions Agreement 22/02/2012 states that to operate a forklift it is necessary to have:'},
      opts:{it:['Solo la patente B','Un\'abilitazione specifica (formazione teorica+pratica) con aggiornamento ogni 5 anni','2 anni di esperienza nel settore logistica','Solo la formazione generale del 2011 per lavoratori'],en:['Only category B driving license','A specific qualification (theoretical+practical training) with 5-year update','2 years experience in logistics','Only the 2011 general worker training']},
      ans:1,exp:{it:'Accordo S-R 22/02/2012 (recepisce Art. 73 c.5): abilitazione obbligatoria per carrellisti. Formazione: modulo giuridico (4h) + tecnico (4h) + pratico (4h) = 12h. Aggiornamento ogni 5 anni (4h).',en:'Agreement 22/02/2012 (implementing Art. 73 c.5): mandatory qualification for forklift operators. Training: legal module (4h) + technical (4h) + practical (4h) = 12h. Update every 5 years (4h).'}},
     {q:{it:"La marcatura CE su un'attrezzatura di lavoro indica che:",en:'CE marking on work equipment indicates that:'},
      opts:{it:['È stata approvata dall\'INAIL','Il fabbricante dichiara la conformità alle direttive CE applicabili','È stata collaudata dall\'ASL','Ha più di 10 anni di vita utile garantita'],en:['It was approved by INAIL','Manufacturer declares conformity to applicable EU directives','It was tested by ASL','It has more than 10 years guaranteed service life']},
      ans:1,exp:{it:'La marcatura CE indica che il fabbricante dichiara che il prodotto è conforme alle direttive UE applicabili (es. Direttiva Macchine 2006/42/CE). Non è un marchio di qualità ma di conformità normativa.',en:'CE marking indicates the manufacturer declares the product conforms to applicable EU directives (e.g. Machinery Directive 2006/42/EC). Not a quality mark but a regulatory conformity mark.'}},
     {q:{it:'Riguardo alla manutenzione delle attrezzature (Art. 71), il DL deve:',en:'Regarding equipment maintenance (Art. 71), employer must:'},
      opts:{it:['Fare manutenzione solo quando l\'attrezzatura si guasta','Garantire manutenzione in buono stato e conservare documentazione verifiche','Affidare la manutenzione solo a ditte esterne certificate','Sostituire ogni attrezzatura dopo 5 anni'],en:['Maintain only when equipment breaks down','Ensure good working order and keep verification documentation','Entrust maintenance only to certified external companies','Replace all equipment after 5 years']},
      ans:1,exp:{it:'Art. 71 c.4: il DL deve prendere le misure affinché le attrezzature siano mantenute in buono stato, effettuare verifiche periodiche (per quelle soggette a rischi di deterioramento) e conservare i registri delle verifiche.',en:'Art. 71 c.4: employer must ensure equipment is maintained in good working order, carry out periodic checks (for equipment subject to deterioration), and keep verification records.'}},
     {q:{it:'La durata totale della formazione base per carrellisti (Accordo 2012) è:',en:'Total duration of basic forklift operator training (Agreement 2012) is:'},
      opts:{it:['8 ore (solo teorico)','12 ore (4h giuridico + 4h tecnico + 4h pratico)','16 ore totali','24 ore totali'],en:['8 hours (theory only)','12 hours (4h legal + 4h technical + 4h practical)','16 hours total','24 hours total']},
      ans:1,exp:{it:"Accordo S-R 22/02/2012: modulo giuridico-normativo (4h) + modulo tecnico (4h) + modulo pratico con addestramento su macchina reale (4h) = 12h totali. Per i transpallet semoventi la formazione è ridotta a 8h. Aggiornamento quinquennale: 4h.",en:'Agreement 22/02/2012: legal-regulatory module (4h) + technical module (4h) + practical module with real machine training (4h) = 12h total. Self-propelled pallet trucks: 8h. 5-year update: 4h.'}}
   ]},

  {id:'B5',cat:'B',order:12,icon:'⚠️',hrs:2,
   title:{it:'Rischi Specifici Logistica e Magazzino',en:'Specific Logistics & Warehouse Risks',fa:'ریسک‌های خاص انبار'},
   sub:{it:'Carrelli elevatori · Scaffalature · Aree di carico · Infortuni tipici',en:'Forklifts · Racking · Loading areas · Typical accidents'},
   arts:['Art. 26','Art. 70','Art. 71','Art. 167'],
   sum:{
     it:`Principali rischi nel settore logistica/magazzino:

1. Investimento da carrello elevatore — causa principale di infortuni gravi/mortali in magazzino
   Prevenzione: corsie pedonali separate, segnaletica a terra, limitazione velocità, regole di precedenza (carrelli cedono il passo ai pedoni nei punti critici).

2. Caduta di materiali dalle scaffalature
   Cause: sovraccarico, errato stoccaggio, scaffalature danneggiate, assenza di sistemi di ritenuta.
   Prevenzione: verifica periodica scaffali (norma UNI EN 15635), formazione operatori, sistema SARI (verde=ok/giallo=attenzione/rosso=fuori servizio).

3. Movimentazione manuale dei carichi (→ Modulo B2): lombalgia, ernie; prevenzione con ausili meccanici e rotazione.

4. Rischi specifici del carrello elevatore:
   • Ribaltamento: velocità eccessiva in curva, carico alzato troppo in alto durante la marcia
   • Caduta del carico: forche non abbassate, peso non centrato, mancanza fermapallet
   In caso di ribaltamento: restare allacciati con cintura, tenersi al volante, inclinare verso l'opposto — MAI saltare fuori.

5. Aree di carico e scarico: rischio caduta dalla banchina, investimento da mezzi esterni.
   Prevenzione: fermaruota (cunei) obbligatori, uso passerelle, segnalazione perimetrale.`,
     en:`Main risks in logistics/warehouse:

1. Forklift collision — main cause of serious/fatal accidents in warehouses
   Prevention: separate pedestrian lanes, floor signage, speed limits, right-of-way rules (forklifts yield to pedestrians at critical points).

2. Material falling from racking
   Causes: overloading, incorrect storage, damaged racking, missing restraint systems.
   Prevention: periodic rack inspection (standard UNI EN 15635), operator training, SARI system (green=ok/yellow=attention/red=out of service).

3. Manual handling of loads (→ Module B2): back pain, disc herniation; prevention with mechanical aids and rotation.

4. Forklift-specific risks:
   • Overturning: excessive speed in curves, load raised too high during travel
   • Load falling: forks not lowered, off-center weight, missing pallet retainers
   If overturning: stay buckled, hold steering wheel, lean opposite direction — NEVER jump out.

5. Loading and unloading areas: dock fall risk, collision from external vehicles.
   Prevention: mandatory wheel chocks, use of walkways, perimeter signage.`
   },
   kp:{
     it:['L\'investimento da carrello elevatore è la prima causa di infortuni gravi nei magazzini','Forche durante la marcia: 15-30 cm da terra, retroinclinazione, MAI alzate','In caso di ribaltamento: restare allacciati e NON saltare — il rollbar protegge l\'operatore','Norma UNI EN 15635: linee guida per ispezione e manutenzione scaffalature metalliche','Sistema SARI: verde=ok, giallo=attenzione/intervento programmato, rosso=fuori servizio immediato'],
     en:['Forklift collision is the #1 cause of serious accidents in warehouses','Forks during travel: 15-30cm from ground, back-tilted, NEVER raised','If overturning: stay buckled and do NOT jump — rollbar protects the operator','Standard UNI EN 15635: guidelines for inspection and maintenance of metal racking','SARI system: green=ok, yellow=attention/scheduled intervention, red=immediate out of service']
   },
   quiz:[
     {q:{it:'Durante la marcia in magazzino, le forche del carrello devono essere:',en:'During warehouse travel, forklift forks must be:'},
      opts:{it:['Al massimo per miglior visibilità','A terra per abbassare il baricentro','A 15-30 cm da terra, retroinclinate','A metà altezza per bilanciare'],en:['At maximum for better visibility','On ground to lower center of gravity','At 15-30 cm from ground, back-tilted','At mid height to balance']},
      ans:2,exp:{it:'Le forche devono essere mantenute a 15-30 cm dal suolo durante la marcia (con o senza carico), retroinclinate. Abbassa il baricentro e riduce il rischio di caduta del carico. Forche a terra = rischio di aggancio su ostacoli.',en:'Forks must be kept at 15-30 cm from ground during travel (loaded or empty), back-tilted. Lowers center of gravity and reduces load fall risk. Forks on ground = risk of catching obstacles.'}},
     {q:{it:'In caso di ribaltamento del carrello elevatore, l\'operatore deve:',en:'In case of forklift overturning, the operator must:'},
      opts:{it:['Saltare immediatamente per evitare di essere schiacciato','Restare allacciato, tenersi al volante e inclinarsi dal lato opposto al ribaltamento','Spegnere immediatamente il motore','Aprire la cabina e appoggiarsi alla struttura'],en:['Jump out immediately to avoid being crushed','Stay buckled, hold steering wheel, lean opposite to overturning direction','Immediately switch off engine','Open cab and lean on the structure']},
      ans:1,exp:{it:"NON saltare mai fuori dal carrello in caso di ribaltamento: il rischio di essere schiacciato dalla struttura è molto elevato. Il rollbar protegge l'operatore. Restare allacciati, tenersi al volante, inclinarsi nella direzione opposta al ribaltamento e aspettare che il mezzo si fermi.",en:'NEVER jump out in case of overturning: risk of being crushed by the structure is very high. The rollbar protects the operator. Stay buckled, hold steering wheel, lean opposite direction and wait for the vehicle to stop.'}},
     {q:{it:'La norma UNI EN 15635 riguarda:',en:'Standard UNI EN 15635 concerns:'},
      opts:{it:['Formazione degli operatori di carrelli','Ispezione, manutenzione e gestione danni alle scaffalature metalliche','Requisiti antincendio dei magazzini','Protezione da agenti chimici'],en:['Forklift operator training','Inspection, maintenance and damage management for metal racking systems','Warehouse fire requirements','Chemical agent protection']},
      ans:1,exp:{it:'UNI EN 15635 "Sistemi di stoccaggio statici in acciaio" fornisce linee guida per uso e manutenzione scaffalature, procedure di ispezione, classificazione danni (sistema SARI: verde/giallo/rosso) e azioni correttive.',en:'UNI EN 15635 "Steel static storage systems" provides guidelines for racking use and maintenance, inspection procedures, damage classification (SARI system: green/yellow/red) and corrective actions.'}},
     {q:{it:'Nelle aree di carico/scarico, per evitare il movimento inaspettato del camion è essenziale usare:',en:'In loading/unloading areas, to prevent unexpected truck movement it is essential to use:'},
      opts:{it:['Solo il freno a mano del camion','Fermaruota (cunei) per bloccare le ruote del veicolo','Il segnale luminoso lampeggiante','La sorveglianza continua di un operatore'],en:['Only the truck handbrake','Wheel chocks to block vehicle wheels','Flashing warning light','Continuous operator surveillance']},
      ans:1,exp:{it:"I fermaruota (cunei) sono il metodo più efficace per prevenire il movimento del camion durante le operazioni di carico/scarico con carrello. Il solo spegnimento del motore è insufficiente perché il veicolo può muoversi per effetto del peso dei carichi movimentati.",en:'Wheel chocks are the most effective method to prevent truck movement during forklift loading/unloading operations. Engine shutdown alone is insufficient as the vehicle can move due to load weight effects.'}}
   ]},
];

const GLOSSARY = [
  {term:'DVR',it:'Documento di Valutazione dei Rischi',en:'Risk Assessment Document',fa:'سند ارزیابی ریسک'},
  {term:'RSPP',it:'Responsabile del Servizio di Prevenzione e Protezione',en:'Prevention and Protection Service Manager',fa:'مسئول خدمات پیشگیری'},
  {term:'ASPP',it:'Addetto al Servizio di Prevenzione e Protezione',en:'Prevention Service Officer',fa:'متصدی خدمات پیشگیری'},
  {term:'RLS',it:'Rappresentante dei Lavoratori per la Sicurezza',en:"Workers' Safety Representative",fa:'نماینده کارگران'},
  {term:'MC',it:'Medico Competente',en:'Occupational Physician',fa:'پزشک شغلی'},
  {term:'DL',it:'Datore di Lavoro',en:'Employer',fa:'کارفرما'},
  {term:'DPI',it:'Dispositivi di Protezione Individuale',en:'Personal Protective Equipment (PPE)',fa:'تجهیزات حفاظت فردی'},
  {term:'DUVRI',it:'Doc. Unico Val. Rischi da Interferenze',en:'Joint Risk Assessment Document',fa:'ارزیابی ریسک مشترک'},
  {term:'MMC',it:'Movimentazione Manuale dei Carichi',en:'Manual Handling of Loads',fa:'جابجایی دستی بار'},
  {term:'SPP',it:'Servizio di Prevenzione e Protezione',en:'Prevention and Protection Service',fa:'خدمات پیشگیری'},
  {term:'LEX,8h',it:'Livello di Esposizione al Rumore (quotidiano)',en:'Daily Personal Noise Exposure Level',fa:'سطح مواجهه روزانه با صدا'},
  {term:'HAV',it:'Vibrazioni trasmesse al sistema Mano-Braccio',en:'Hand-Arm Vibration',fa:'لرزش دست-بازو'},
  {term:'WBV',it:'Vibrazioni trasmesse al Corpo Intero',en:'Whole-Body Vibration',fa:'لرزش کل بدن'},
  {term:'NIOSH',it:'Metodo di valutazione rischio MMC (National Institute for Occupational Safety and Health)',en:'MMC risk assessment method',fa:'روش ارزیابی MMC'},
  {term:'SARI',it:'Schema di Analisi e Riparazione Immediata (scaffalature)',en:'Racking Damage Inspection System',fa:'سیستم بازرسی آسیب قفسه‌بندی'},
];

function ProgressBar({value, max, color=C.green, h=6}) {
  const pct = max > 0 ? Math.min(100, (value/max)*100) : 0;
  return (
    <div style={{background:C.line, borderRadius:99, height:h, overflow:'hidden'}}>
      <div style={{width:`${pct}%`, height:'100%', background:color, borderRadius:99, transition:'width .4s ease'}}/>
    </div>
  );
}

function MarkdownText({text}) {
  const lines = text.split('\n');
  return (
    <div style={{color:C.paper, fontFamily:"'Spectral', serif", lineHeight:1.75, fontSize:15}}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{height:8}}/>;
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const isBullet = line.trim().startsWith('•');
        const isH = line.match(/^[A-Z].+:$/);
        const content = parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{color:C.yellow, fontWeight:600}}>{p}</strong> : p);
        if (isBullet) return <div key={i} style={{paddingLeft:16, marginBottom:3, display:'flex', gap:8}}><span style={{color:C.yellow, flexShrink:0}}>•</span><span>{content}</span></div>;
        if (isH) return <div key={i} style={{color:C.paperDim, fontFamily:"'Inter',sans-serif", fontWeight:700, marginTop:12, marginBottom:4, fontSize:11, letterSpacing:2, textTransform:'uppercase'}}>{content}</div>;
        return <div key={i} style={{marginBottom:2}}>{content}</div>;
      })}
    </div>
  );
}

export default function App() {
  const [view, setView]   = useState('home');
  const [mod, setMod]     = useState(null);
  const [lang, setLang]   = useState('it');
  const [tab, setTab]     = useState('summary');
  const [quiz, setQuiz]   = useState(null);
  const [progress, setProgress] = useState({xp:0, done:{}, best:{}});

  useEffect(() => {
    window.storage?.get('dlgs81_v1').then(r => {
      if (r) try { setProgress(JSON.parse(r.value)); } catch(e) {}
    }).catch(()=>{});
    const l = document.createElement('link');
    l.rel='stylesheet'; l.href=FONT_LINK;
    document.head.appendChild(l);
  }, []);

  const save = (p) => window.storage?.set('dlgs81_v1', JSON.stringify(p)).catch(()=>{});
  const openModule = (m) => { setMod(m); setTab('summary'); setView('study'); };
  const startQuiz = () => { setQuiz({idx:0, selected:null, revealed:false, answers:[], finished:false, score:0, xpEarned:0}); setView('quiz'); };
  const selectAnswer = (i) => { if (quiz.revealed) return; setQuiz(q => ({...q, selected:i, revealed:true})); };

  const nextQ = () => {
    const newAnswers = [...quiz.answers, quiz.selected];
    const isLast = quiz.idx + 1 >= mod.quiz.length;
    if (isLast) {
      const score = newAnswers.filter((a, i) => a === mod.quiz[i].ans).length;
      const pct = score / mod.quiz.length;
      const xp = Math.round(pct * 50) + 10;
      setProgress(prev => {
        const next = { xp: prev.xp + xp, done: {...prev.done, [mod.id]: true}, best: {...prev.best, [mod.id]: Math.max(prev.best[mod.id]||0, score)} };
        save(next); return next;
      });
      setQuiz(q => ({...q, answers:newAnswers, finished:true, score, xpEarned:xp}));
      setView('results');
    } else {
      setQuiz(q => ({...q, idx:q.idx+1, selected:null, revealed:false, answers:newAnswers}));
    }
  };

  const completedCount = Object.keys(progress.done).length;
  const bandColor = (cat) => cat === 'A' ? C.blue : C.yellow;
  const bandInk = (cat) => cat === 'A' ? C.blueInk : C.yellowInk;

  const globalStyle = `
    * { box-sizing: border-box; margin:0; padding:0; }
    ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:${C.ink}} ::-webkit-scrollbar-thumb{background:${C.line};border-radius:99px}
    .pill-btn:hover{opacity:.88; transform:translateY(-1px);}
    .pill-btn{transition:all .15s ease;}
    .band-card:hover{filter:brightness(1.04);}
    .opt-btn:hover{border-color:${C.yellow}!important;}
    .tab-btn:hover{color:${C.yellow}!important;}
    .gls-row:hover{background:${C.surface2}!important;}
  `;

  // ── HOME ──
  if (view === 'home') return (
    <div style={{background:C.ink, minHeight:'100vh', color:C.paper, fontFamily:"'Inter', sans-serif"}}>
      <style>{globalStyle}</style>

      <div style={{maxWidth:780, margin:'0 auto', padding:'28px 20px 60px'}}>

        {/* HEADER */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:18, borderBottom:`1px solid ${C.line}`, marginBottom:24}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <MosoLogo size={38}/>
            <div>
              <div style={{fontSize:10, letterSpacing:3, color:C.paperDim, textTransform:'uppercase'}}>studio guidato · by Moso</div>
              <div style={{fontFamily:"'Anton', sans-serif", fontSize:21, letterSpacing:1, textTransform:'uppercase'}}>D.Lgs. 81/08</div>
            </div>
          </div>
          <div style={{display:'flex', gap:6}}>
            {['it','en','fa'].map(l => (
              <button key={l} onClick={()=>setLang(l)} className="pill-btn"
                style={{background:lang===l?C.paper:'transparent', color:lang===l?C.ink:C.paperDim, border:`1px solid ${lang===l?C.paper:C.line}`, borderRadius:999, padding:'5px 14px', fontSize:11, fontWeight:600, cursor:'pointer', textTransform:'uppercase'}}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={()=>setView('glossary')} className="pill-btn"
              style={{background:'transparent', border:`1px solid ${C.line}`, color:C.paperDim, borderRadius:999, padding:'5px 14px', fontSize:11, cursor:'pointer'}}>
              glossario
            </button>
          </div>
        </div>

        {/* HERO STATS */}
        <div style={{display:'flex', gap:12, marginBottom:28}}>
          <div style={{flex:1, background:C.green, color:C.greenInk, borderRadius:10, padding:'18px 20px'}}>
            <div style={{fontSize:11, letterSpacing:2, textTransform:'uppercase', opacity:.85, marginBottom:2}}>esperienza totale</div>
            <div style={{fontFamily:"'Anton', sans-serif", fontSize:48, lineHeight:.9}}>{progress.xp}</div>
          </div>
          <div style={{flex:1, background:C.surface2, border:`1px solid ${C.line}`, borderRadius:10, padding:'18px 20px'}}>
            <div style={{fontSize:11, letterSpacing:2, textTransform:'uppercase', color:C.paperDim, marginBottom:2}}>moduli completati</div>
            <div style={{fontFamily:"'Anton', sans-serif", fontSize:48, lineHeight:.9, color:C.yellow}}>
              {completedCount}<span style={{fontSize:22, color:C.paperDim}}>/{MODS.length}</span>
            </div>
          </div>
        </div>
        <div style={{marginBottom:32}}><ProgressBar value={completedCount} max={MODS.length} color={C.green}/></div>

        {/* MODULE BANDS */}
        {['A','B'].map(cat => (
          <div key={cat} style={{marginBottom:28}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
              <div style={{fontSize:11, letterSpacing:2, color:C.paperDim, textTransform:'uppercase'}}>
                modulo {cat} — {cat==='A'?'base comune (28h)':'logistica & magazzino'}
              </div>
              <div style={{flex:1, height:1, background:C.line}}/>
            </div>
            {MODS.filter(m=>m.cat===cat).map(m => {
              const done = progress.done[m.id];
              const best = progress.best[m.id]||0;
              return (
                <div key={m.id} className="band-card" onClick={()=>openModule(m)}
                  style={{background:bandColor(cat), color:bandInk(cat), borderRadius:10, padding:'18px 20px', marginBottom:10, cursor:'pointer', position:'relative', overflow:'hidden'}}>
                  {done && (
                    <div style={{position:'absolute', top:14, right:16, width:34, height:34, borderRadius:'50%', background:C.green, color:C.greenInk, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Anton',sans-serif", fontSize:16, transform:'rotate(8deg)', boxShadow:'0 0 0 3px rgba(0,0,0,0.12)'}}>
                      ✓
                    </div>
                  )}
                  <div style={{fontSize:11, letterSpacing:2, textTransform:'uppercase', opacity:.8, fontWeight:600, marginBottom:4}}>
                    {m.id} · {m.hrs}h · {m.quiz.length} quiz
                  </div>
                  <div style={{fontFamily:"'Anton', sans-serif", fontSize:26, lineHeight:1, marginBottom:6, maxWidth:480, textTransform:'uppercase'}}>
                    {m.title[lang]||m.title.it}
                  </div>
                  <div style={{fontSize:12.5, opacity:.85, maxWidth:440, lineHeight:1.5}}>
                    {m.sub[lang==='en'?'en':'it']}
                  </div>
                  {done && (
                    <div style={{marginTop:10, display:'inline-block', background:'rgba(0,0,0,0.14)', borderRadius:6, padding:'2px 10px', fontSize:11, fontWeight:600}}>
                      {best}/{m.quiz.length} corrette
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {progress.xp > 0 && (
          <div style={{textAlign:'center', marginTop:20}}>
            <button onClick={()=>{const r={xp:0,done:{},best:{}};setProgress(r);save(r);}} className="pill-btn"
              style={{background:'transparent', border:`1px solid ${C.line}`, color:C.paperFaint, borderRadius:999, padding:'6px 16px', fontSize:11, cursor:'pointer'}}>
              reset progresso
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── STUDY ──
  if (view === 'study' && mod) {
    const l = lang === 'en' ? 'en' : 'it';
    return (
      <div style={{background:C.ink, minHeight:'100vh', color:C.paper, fontFamily:"'Inter', sans-serif"}}>
        <style>{globalStyle}</style>
        <div style={{background:bandColor(mod.cat), color:bandInk(mod.cat), padding:'16px 20px'}}>
          <div style={{maxWidth:780, margin:'0 auto'}}>
            <button onClick={()=>setView('home')} className="pill-btn"
              style={{background:'rgba(0,0,0,0.14)', border:'none', color:'inherit', borderRadius:999, padding:'5px 14px', fontSize:12, cursor:'pointer', marginBottom:12}}>
              ← home
            </button>
            <div style={{fontSize:11, letterSpacing:2, textTransform:'uppercase', opacity:.8, fontWeight:600}}>{mod.id} · modulo {mod.cat}</div>
            <div style={{fontFamily:"'Anton', sans-serif", fontSize:30, textTransform:'uppercase', lineHeight:1.05, marginTop:4}}>{mod.title[lang]||mod.title.it}</div>
            <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
              {mod.arts.map(a => <span key={a} style={{background:'rgba(0,0,0,0.14)', borderRadius:5, padding:'2px 9px', fontSize:11}}>{a}</span>)}
            </div>
          </div>
        </div>

        <div style={{maxWidth:780, margin:'0 auto', padding:'0 20px'}}>
          <div style={{display:'flex', borderBottom:`1px solid ${C.line}`, marginTop:4}}>
            {[['summary','sommario'],['keypoints','punti chiave'],['quiz',`quiz (${mod.quiz.length})`]].map(([k,label])=>(
              <button key={k} className="tab-btn" onClick={()=>setTab(k)}
                style={{background:'transparent', border:'none', borderBottom:`2px solid ${tab===k?C.yellow:'transparent'}`, color:tab===k?C.yellow:C.paperDim, padding:'14px 18px', fontSize:13, cursor:'pointer', fontWeight:tab===k?600:400}}>
                {label}
              </button>
            ))}
            <div style={{display:'flex', gap:6, marginLeft:'auto', alignItems:'center'}}>
              {['it','en','fa'].map(l2=>(
                <button key={l2} onClick={()=>setLang(l2)} className="pill-btn"
                  style={{background:lang===l2?C.paper:'transparent', color:lang===l2?C.ink:C.paperDim, border:`1px solid ${lang===l2?C.paper:C.line}`, borderRadius:999, padding:'3px 10px', fontSize:11, cursor:'pointer', fontWeight:600}}>
                  {l2.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{padding:'24px 0 60px'}}>
            {tab === 'summary' && (
              lang === 'fa' ? (
                <div dir="rtl" style={{fontFamily:'Tahoma, Arial', lineHeight:2, fontSize:14}}>
                  <div style={{color:C.yellow, fontWeight:700, fontSize:16, marginBottom:8}}>{mod.title.fa}</div>
                  <p style={{color:C.paperDim, fontSize:12}}>برای محتوای کامل، زبان ایتالیایی یا انگلیسی را انتخاب کنید.</p>
                </div>
              ) : <MarkdownText text={mod.sum[l]} />
            )}

            {tab === 'keypoints' && (
              <div>
                {(lang==='fa'?mod.kp.it:mod.kp[l]||mod.kp.it).map((pt, i) => (
                  <div key={i} style={{display:'flex', gap:12, marginBottom:12, alignItems:'flex-start'}}>
                    <div style={{width:24, height:24, borderRadius:6, background:bandColor(mod.cat)+'33', border:`1px solid ${bandColor(mod.cat)}55`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, fontWeight:700, color:C.yellow}}>
                      {i+1}
                    </div>
                    <div style={{fontFamily:"'Spectral', serif", fontSize:15, lineHeight:1.65, paddingTop:3}}>{pt}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'quiz' && (
              <div style={{textAlign:'center', padding:'40px 0'}}>
                <div style={{width:64, height:64, borderRadius:'50%', background:C.green, color:C.greenInk, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Anton',sans-serif", fontSize:26, margin:'0 auto 20px'}}>?</div>
                <div style={{fontFamily:"'Anton', sans-serif", fontSize:20, textTransform:'uppercase', marginBottom:8}}>pronto per il quiz?</div>
                <div style={{color:C.paperDim, fontSize:13, marginBottom:20}}>{mod.quiz.length} domande · fino a 60 xp</div>
                {progress.best[mod.id] !== undefined && (
                  <div style={{color:C.yellow, fontSize:13, marginBottom:16}}>miglior punteggio: {progress.best[mod.id]}/{mod.quiz.length}</div>
                )}
                <button onClick={startQuiz} className="pill-btn"
                  style={{background:C.yellow, color:C.yellowInk, border:'none', borderRadius:999, padding:'13px 36px', fontSize:14, fontWeight:700, cursor:'pointer', letterSpacing:1, textTransform:'uppercase'}}>
                  inizia quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  if (view === 'quiz' && mod && quiz) {
    const q = mod.quiz[quiz.idx];
    const l = lang === 'en' ? 'en' : 'it';
    const isCorrect = quiz.selected === q.ans;
    return (
      <div style={{background:C.ink, minHeight:'100vh', color:C.paper, fontFamily:"'Inter', sans-serif"}}>
        <style>{globalStyle}</style>
        <div style={{background:C.surface, borderBottom:`1px solid ${C.line}`, padding:'14px 20px'}}>
          <div style={{maxWidth:680, margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
              <div style={{fontSize:12, color:C.yellow, fontWeight:600}}>{mod.id} — {mod.title[l]||mod.title.it}</div>
              <div style={{fontSize:12, color:C.paperDim}}>domanda {quiz.idx+1}/{mod.quiz.length}</div>
            </div>
            <ProgressBar value={quiz.idx} max={mod.quiz.length} color={C.yellow} h={4}/>
          </div>
        </div>

        <div style={{maxWidth:680, margin:'0 auto', padding:'28px 20px 60px'}}>
          <div style={{background:C.surface, borderRadius:10, padding:24, border:`1px solid ${C.line}`, marginBottom:20}}>
            <div style={{fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:2, color:C.paperDim, textTransform:'uppercase', marginBottom:12}}>domanda {quiz.idx+1}</div>
            <div style={{fontFamily:"'Spectral', serif", fontSize:18, lineHeight:1.6}}>{q.q[l]||q.q.it}</div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {(q.opts[l]||q.opts.it).map((opt, i) => {
              let border = `1px solid ${C.line}`, bg = C.surface, color = C.paper, icon = null;
              if (quiz.revealed) {
                if (i === q.ans) { bg = C.greenDeep; border = `1px solid ${C.green}`; color = C.greenInk; icon = '✓'; }
                else if (i === quiz.selected) { bg = '#3a1414'; border = `1px solid ${C.red}`; color = C.redInk; icon = '✗'; }
                else { color = C.paperFaint; }
              }
              return (
                <button key={i} onClick={()=>selectAnswer(i)} className={quiz.revealed?'':'opt-btn'}
                  style={{background:bg, border, borderRadius:10, padding:'12px 16px', textAlign:'left', cursor:quiz.revealed?'default':'pointer', color, display:'flex', gap:10, alignItems:'center', fontSize:14, fontFamily:"'Spectral', serif"}}>
                  <span style={{width:26, height:26, borderRadius:'50%', background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0, fontFamily:"'Anton',sans-serif", color: quiz.revealed && i===q.ans?C.green : quiz.revealed && i===quiz.selected?C.red : C.paperDim}}>
                    {icon || String.fromCharCode(65+i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {quiz.revealed && (
            <div style={{marginTop:18}}>
              <div style={{background:C.surface2, borderRadius:10, padding:16, marginBottom:16, display:'flex', gap:12}}>
                <div style={{width:38, height:38, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Anton',sans-serif", fontSize:17, background:isCorrect?C.green:C.red, color:isCorrect?C.greenInk:C.redInk}}>
                  {isCorrect?'✓':'✗'}
                </div>
                <div>
                  <div style={{fontSize:12, fontWeight:700, color:isCorrect?C.green:C.red, marginBottom:4, textTransform:'uppercase', letterSpacing:1}}>
                    {isCorrect?'corretto':'risposta errata'}
                  </div>
                  <div style={{fontFamily:"'Spectral', serif", fontSize:14, lineHeight:1.65}}>{q.exp[l]||q.exp.it}</div>
                </div>
              </div>
              <button onClick={nextQ} className="pill-btn"
                style={{width:'100%', background:C.yellow, color:C.yellowInk, border:'none', borderRadius:999, padding:'13px', fontSize:14, fontWeight:700, cursor:'pointer', letterSpacing:1, textTransform:'uppercase'}}>
                {quiz.idx+1 >= mod.quiz.length ? 'termina →' : 'avanti →'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (view === 'results' && mod && quiz) {
    const pct = quiz.score / mod.quiz.length;
    const grade = pct >= .75 ? {l:'eccellente!', c:C.green, ink:C.greenInk} : pct >= .5 ? {l:'bene', c:C.yellow, ink:C.yellowInk} : {l:'continua a studiare', c:C.red, ink:C.redInk};
    return (
      <div style={{background:C.ink, minHeight:'100vh', color:C.paper, fontFamily:"'Inter', sans-serif", display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
        <style>{globalStyle}</style>
        <div style={{background:grade.c, color:grade.ink, borderRadius:16, padding:40, maxWidth:440, width:'100%', textAlign:'center'}}>
          <div style={{fontFamily:"'Anton', sans-serif", fontSize:28, textTransform:'uppercase', marginBottom:6}}>{grade.l}</div>
          <div style={{fontSize:13, opacity:.85, marginBottom:24}}>{mod.id} — {mod.title[lang]||mod.title.it}</div>
          <div style={{display:'flex', justifyContent:'center', gap:32, marginBottom:24}}>
            <div>
              <div style={{fontFamily:"'Anton', sans-serif", fontSize:44}}>{quiz.score}/{mod.quiz.length}</div>
              <div style={{fontSize:11, opacity:.8, textTransform:'uppercase', letterSpacing:1}}>corrette</div>
            </div>
            <div>
              <div style={{fontFamily:"'Anton', sans-serif", fontSize:44}}>+{quiz.xpEarned}</div>
              <div style={{fontSize:11, opacity:.8, textTransform:'uppercase', letterSpacing:1}}>xp</div>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            <button onClick={()=>setView('study')} className="pill-btn"
              style={{background:'rgba(0,0,0,0.18)', color:'inherit', border:'none', borderRadius:999, padding:'11px', fontSize:13, fontWeight:700, cursor:'pointer'}}>
              ← torna al modulo
            </button>
            <button onClick={startQuiz} className="pill-btn"
              style={{background:'transparent', color:'inherit', border:'1px solid rgba(0,0,0,0.3)', borderRadius:999, padding:'11px', fontSize:13, cursor:'pointer'}}>
              riprova il quiz
            </button>
            <button onClick={()=>setView('home')} style={{background:'transparent', color:'inherit', border:'none', padding:'8px', fontSize:12, cursor:'pointer', opacity:.8}}>
              tutti i moduli
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GLOSSARY ──
  if (view === 'glossary') {
    return (
      <div style={{background:C.ink, minHeight:'100vh', color:C.paper, fontFamily:"'Inter', sans-serif"}}>
        <style>{globalStyle}</style>
        <div style={{maxWidth:720, margin:'0 auto', padding:'24px 20px 60px'}}>
          <button onClick={()=>setView('home')} className="pill-btn"
            style={{background:'transparent', border:`1px solid ${C.line}`, color:C.paperDim, borderRadius:999, padding:'5px 14px', fontSize:12, cursor:'pointer', marginBottom:20}}>
            ← home
          </button>
          <div style={{fontFamily:"'Anton', sans-serif", fontSize:22, textTransform:'uppercase', color:C.yellow, marginBottom:20}}>glossario — termini chiave</div>
          {GLOSSARY.map(g => (
            <div key={g.term} className="gls-row" style={{borderRadius:8, padding:'12px 16px', marginBottom:8, border:`1px solid ${C.line}`, display:'flex', gap:16, alignItems:'flex-start'}}>
              <div style={{background:C.surface2, border:`1px solid ${C.line}`, borderRadius:6, padding:'3px 10px', fontSize:11, color:C.yellow, fontFamily:'monospace', fontWeight:700, flexShrink:0, minWidth:80, textAlign:'center'}}>
                {g.term}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600, fontSize:14, marginBottom:2}}>{g[lang==='fa'?'it':lang]}</div>
                {lang!=='fa' && <div style={{color:C.paperFaint, fontSize:11, marginTop:2, direction:'rtl', fontFamily:'Tahoma', textAlign:'right'}}>{g.fa}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div style={{background:C.ink, minHeight:'100vh'}}/>;
}
