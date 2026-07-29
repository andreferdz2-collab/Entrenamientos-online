import React, { useState, useEffect, useCallback, useRef } from "react";

/* ---------- Paleta / tipografía ----------
   Fondo pizarra de gimnasio (grafito verdoso), tiza blanca, acento
   ámbar (disco de fierro cargado). Data numérica en monoespaciada.
------------------------------------------- */
const FONT_LINK_ID = "reg-entreno-fonts";

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const uid = () => Math.random().toString(36).slice(2, 10);
const genPin = () => String(Math.floor(1000 + Math.random() * 9000));
const todayISO = () => new Date().toISOString().slice(0, 10);

/* Base de ejercicios de tu programa: nombre, músculo y link a la técnica */
const EXERCISE_DB = [{"musculo":"PECTORAL","nombre":"Press ligeramente inclinado con mancuernas","link":"https://www.sergiomcoach.com/topics/ejercicio-1-2/"},{"musculo":"PECTORAL","nombre":"Press inclinado con mancuernas","link":"https://www.sergiomcoach.com/topics/2-press-inclinado-con-mancuernas-2/"},{"musculo":"PECTORAL","nombre":"Press plano con mancuernas","link":"https://www.sergiomcoach.com/topics/3-press-plano-con-mancuernas-2/"},{"musculo":"PECTORAL","nombre":"Press declinado con barra","link":"https://www.sergiomcoach.com/topics/4-press-declinado-con-barra-2/"},{"musculo":"PECTORAL","nombre":"Press declinado con mancuernas","link":"https://www.sergiomcoach.com/topics/5-press-declinado-con-mancuernas-2/"},{"musculo":"PECTORAL","nombre":"Press ligera inclinación en multipower","link":"https://www.sergiomcoach.com/topics/6-press-ligera-inclinacion-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press plano en multipower","link":"https://www.sergiomcoach.com/topics/7-press-plano-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press press inclinado en multipower","link":"https://www.sergiomcoach.com/topics/8-press-inclinado-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press inclinado con barra","link":"https://www.sergiomcoach.com/topics/9-press-inclinado-con-barra-2/"},{"musculo":"PECTORAL","nombre":"Press inverso en multipower","link":"https://www.sergiomcoach.com/topics/10-press-inverso-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press cerrado en multipower","link":"https://www.sergiomcoach.com/topics/11-press-cerrado-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press cerrado con barra","link":"https://www.sergiomcoach.com/topics/12-press-cerrado-con-barra-2/"},{"musculo":"PECTORAL","nombre":"Empuje en máquina prono","link":"https://www.sergiomcoach.com/topics/13-empuje-en-maquina-prono-2/"},{"musculo":"PECTORAL","nombre":"Cruces en polea sentado","link":"https://www.sergiomcoach.com/topics/14-cruces-en-polea-sentado-2/"},{"musculo":"PECTORAL","nombre":"Cruces en polea de pie","link":"https://www.sergiomcoach.com/topics/15-cruces-en-polea-de-pie-2/"},{"musculo":"PECTORAL","nombre":"Bayesian Flies","link":"https://www.sergiomcoach.com/topics/16-bayesian-flyes-2/"},{"musculo":"PECTORAL","nombre":"High Cable CrossOver","link":"https://www.sergiomcoach.com/topics/17-high-cable-crossover-2/"},{"musculo":"PECTORAL","nombre":"Low Cable Flies","link":"https://www.sergiomcoach.com/topics/18-low-cable-flies-2/"},{"musculo":"PECTORAL","nombre":"Aperturas en polea en banco inclinado","link":"https://www.sergiomcoach.com/topics/19-aperturas-en-polea-en-banco-inclinado-2/"},{"musculo":"PECTORAL","nombre":"Aperturas con mancuerna en banco inclinado","link":"https://www.sergiomcoach.com/topics/20-aperturas-con-mancuerna-en-banco-inclinado-2/"},{"musculo":"PECTORAL","nombre":"Aperturas en polea en banco plano","link":"https://www.sergiomcoach.com/topics/21-aperturas-en-polea-en-banco-plano-2/"},{"musculo":"PECTORAL","nombre":"Aperturas con mancuerna en banco plano","link":"https://www.sergiomcoach.com/topics/22-aperturas-con-mancuerna-en-banco-plano-2-2/"},{"musculo":"PECTORAL","nombre":"Pec Fly","link":"https://www.sergiomcoach.com/topics/22-aperturas-con-mancuerna-en-banco-plano-3/"},{"musculo":"PECTORAL","nombre":"Fondos en paralelas para pectoral","link":"https://www.sergiomcoach.com/topics/24-fondos-en-paralelas-para-pectoral-2/"},{"musculo":"PECTORAL","nombre":"Fondos en máquina para pectoral","link":"https://www.sergiomcoach.com/topics/25-fondos-en-maquina-para-pectoral-2/"},{"musculo":"PECTORAL","nombre":"Hex Press con mancuernas","link":"https://www.sergiomcoach.com/topics/26-hex-press-con-mancuernas-2/"},{"musculo":"PECTORAL","nombre":"Hex Press en multipower","link":"https://www.sergiomcoach.com/topics/27-hex-press-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Aperturas declinadas con mancuerna","link":"https://www.sergiomcoach.com/topics/28-aperturas-declinadas-con-mancuernas-2/"},{"musculo":"PECTORAL","nombre":"Aperturas declinadas en polea","link":"https://www.sergiomcoach.com/topics/29-aperturas-declinadas-en-polea-baja-2/"},{"musculo":"PECTORAL","nombre":"Press declinado en multipower","link":"https://www.sergiomcoach.com/topics/30-press-declinado-en-multipower-2/"},{"musculo":"PECTORAL","nombre":"Press banca","link":"https://www.sergiomcoach.com/topics/32-press-banca-2/"},{"musculo":"PECTORAL","nombre":"Press lateral en máquina","link":"https://www.sergiomcoach.com/topics/34-press-lateral-en-maquina-2/"},{"musculo":"PECTORAL","nombre":"Press lateral en polea","link":"https://www.sergiomcoach.com/topics/33-press-lateral-en-polea-2/"},{"musculo":"PECTORAL","nombre":"Standing cable Press","link":"https://www.sergiomcoach.com/topics/35-seated-cable-press-2/"},{"musculo":"PECTORAL","nombre":"Standing cable Press","link":"https://www.sergiomcoach.com/topics/36-standing-cable-press-2/"},{"musculo":"PECTORAL","nombre":"Press Declinado en máquina","link":"https://www.sergiomcoach.com/topics/36-press-declinado-en-maquina-2/"},{"musculo":"PECTORAL","nombre":"Pec Deck","link":"https://www.sergiomcoach.com/topics/37-peck-deck-2/"},{"musculo":"PECTORAL","nombre":"Press plano en máquina de palancas","link":"https://www.sergiomcoach.com/topics/38-press-plano-palancas-2/"},{"musculo":"PECTORAL","nombre":"Dumbell Twist Press","link":"https://www.sergiomcoach.com/topics/39-dumbell-twist-press-2/"},{"musculo":"PECTORAL","nombre":"Cruces en polea en banco inclinado a 60º","link":"https://www.sergiomcoach.com/topics/40-cruces-en-polea-en-banco-inclinado-a-60o-2/"},{"musculo":"PECTORAL","nombre":"Press inclinado en máquina sentado","link":"https://www.sergiomcoach.com/topics/41-press-inclinado-sentado-2/"},{"musculo":"PECTORAL","nombre":"Empuje en máquina neutro convergente","link":"https://www.sergiomcoach.com/topics/42-empuje-en-maquina-neutro-convergente-2/"},{"musculo":"PECTORAL","nombre":"Press plano en máquina sentado","link":"https://www.sergiomcoach.com/topics/43-press-plano-sentado-en-maquina-plate-loaded-2/"},{"musculo":"PECTORAL","nombre":"Costal Press around","link":"https://www.sergiomcoach.com/topics/44-costal-press-around-2/"},{"musculo":"PECTORAL","nombre":"Clavicular Press Around","link":"https://www.sergiomcoach.com/topics/45-clavicular-press-around-2/"},{"musculo":"PECTORAL","nombre":"Press en máquina inclinado","link":"https://www.sergiomcoach.com/topics/46-press-inclinado-en-maquina-tumbado-2/"},{"musculo":"ESPALDA","nombre":"Dominadas Pronas","link":"https://www.sergiomcoach.com/topics/1-dominadas-pronas-2/"},{"musculo":"ESPALDA","nombre":"Dominadas supinas","link":"https://www.sergiomcoach.com/topics/2-dominadas-supinas-2/"},{"musculo":"ESPALDA","nombre":"Dominadas neutras","link":"https://www.sergiomcoach.com/topics/3-dominadas-neutras-2/"},{"musculo":"ESPALDA","nombre":"Jalon al pecho prono","link":"https://www.sergiomcoach.com/topics/4-jalon-al-pecho-prono-2/"},{"musculo":"ESPALDA","nombre":"Jalon al pecho supino","link":"https://www.sergiomcoach.com/topics/5-jalon-al-pecho-supino-2/"},{"musculo":"ESPALDA","nombre":"Jalon al pecho neutro","link":"https://www.sergiomcoach.com/topics/6-jalon-al-pecho-neutro-2/"},{"musculo":"ESPALDA","nombre":"Jalon al pecho en banco inclinado a 2 manos","link":"https://www.sergiomcoach.com/topics/7-jalon-al-pecho-en-banco-inclinado-a-2-manos-2/"},{"musculo":"ESPALDA","nombre":"Jalon al pecho unilateral en banco inclinado","link":"https://www.sergiomcoach.com/topics/8-jalon-al-pecho-unilateral-en-banco-inclinado-2/"},{"musculo":"ESPALDA","nombre":"Remo con barra Supino","link":"https://www.sergiomcoach.com/topics/9-remo-con-barra-supino-2/"},{"musculo":"ESPALDA","nombre":"Remo gironda alto","link":"https://www.sergiomcoach.com/topics/10-remo-gironda-alto-2/"},{"musculo":"ESPALDA","nombre":"Remo gironda","link":"https://www.sergiomcoach.com/topics/11-remo-gironda-2/"},{"musculo":"ESPALDA","nombre":"Remo prono en máquina","link":"https://www.sergiomcoach.com/topics/12-remo-prono-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Remo neutro en maquina","link":"https://www.sergiomcoach.com/topics/13-remo-neutro-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Remo de pie unilateral en máquina","link":"https://www.sergiomcoach.com/topics/14-remo-de-pie-unilateral-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Remo gironda unilateral","link":"https://www.sergiomcoach.com/topics/15-remo-gironda-unilateral-2/"},{"musculo":"ESPALDA","nombre":"Seal Row","link":"https://www.sergiomcoach.com/topics/16-seal-row-con-mancuernas-2/"},{"musculo":"ESPALDA","nombre":"Bench Cable Row","link":"https://www.sergiomcoach.com/topics/17-bench-cable-row-2/"},{"musculo":"ESPALDA","nombre":"Pull Over en polea alta unilateral","link":"https://www.sergiomcoach.com/topics/18-pull-over-en-polea-alta-unilateral-2/"},{"musculo":"ESPALDA","nombre":"Pull Over desde polea alta con cuerda","link":"https://www.sergiomcoach.com/topics/19-pull-over-desde-polea-alta-con-cuerda-2/"},{"musculo":"ESPALDA","nombre":"Remo con mancuerna unilateral","link":"https://www.sergiomcoach.com/topics/20-remo-con-mancuerna-unilateral-2/"},{"musculo":"ESPALDA","nombre":"Remo en banco inclinado desde polea baja","link":"https://www.sergiomcoach.com/topics/21-remo-en-banco-inclinado-desde-polea-baja-2/"},{"musculo":"ESPALDA","nombre":"Meadows Row","link":"https://www.sergiomcoach.com/topics/22-meadows-row-2/"},{"musculo":"ESPALDA","nombre":"Aducción para dorsal en polea alta","link":"https://www.sergiomcoach.com/topics/23-aduccion-para-dorsal-en-polea-alta-2/"},{"musculo":"ESPALDA","nombre":"Jaon al pecho foco espalda alta","link":"https://www.sergiomcoach.com/topics/24-jalon-al-pecho-foco-espalda-alta-2/"},{"musculo":"ESPALDA","nombre":"Remo en polea plano transversal","link":"https://www.sergiomcoach.com/topics/25-remo-en-polea-plano-transversal-2/"},{"musculo":"ESPALDA","nombre":"Jalón unilateral sentado","link":"https://www.sergiomcoach.com/topics/27-jalon-unilateral-sentado-2/"},{"musculo":"ESPALDA","nombre":"Remo gironda agarres independientes","link":"https://www.sergiomcoach.com/topics/28-remo-gironda-agarres-independientes-2/"},{"musculo":"ESPALDA","nombre":"Dante Row","link":"https://www.sergiomcoach.com/topics/29-dante-row-2/"},{"musculo":"ESPALDA","nombre":"Back Boob Pull Down","link":"https://www.sergiomcoach.com/topics/26-back-boob-pull-down-2/"},{"musculo":"ESPALDA","nombre":"Remo Pendlay","link":"https://www.sergiomcoach.com/topics/30-remo-pendlay-2/"},{"musculo":"ESPALDA","nombre":"Remo en multipower","link":"https://www.sergiomcoach.com/topics/31-remo-en-multipower-2/"},{"musculo":"ESPALDA","nombre":"Remo en punta","link":"https://www.sergiomcoach.com/topics/32-remo-en-punta-2/"},{"musculo":"ESPALDA","nombre":"Remo en T","link":"https://www.sergiomcoach.com/topics/33-remo-en-t-2/"},{"musculo":"ESPALDA","nombre":"Single Arm Landmine Row","link":"https://www.sergiomcoach.com/topics/34-single-arm-landmine-row-2/"},{"musculo":"ESPALDA","nombre":"Incline bench Dumbell Row","link":"https://www.sergiomcoach.com/topics/35-incline-bench-dumbell-row-2/"},{"musculo":"ESPALDA","nombre":"Remo con mancuernas Torso inclinado","link":"https://www.sergiomcoach.com/topics/36-remo-con-mancuernas-torso-inclinado-2/"},{"musculo":"ESPALDA","nombre":"Jaon unilateral en máquina","link":"https://www.sergiomcoach.com/topics/37-jalon-unilateral-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Pull Over sentado","link":"https://www.sergiomcoach.com/topics/38-pull-over-sentado-2/"},{"musculo":"ESPALDA","nombre":"Pull Over en máquina","link":"https://www.sergiomcoach.com/topics/39-pull-over-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Seal Row con barra","link":"https://www.sergiomcoach.com/topics/40-seal-row-con-barra-2/"},{"musculo":"ESPALDA","nombre":"Helms Row","link":"https://www.sergiomcoach.com/topics/41-helms-row-2/"},{"musculo":"ESPALDA","nombre":"Rack Pulls","link":"https://www.sergiomcoach.com/topics/42-rack-pull-2/"},{"musculo":"ESPALDA","nombre":"Remo prono en máquina Plate loaded","link":"https://www.sergiomcoach.com/topics/43-remo-prono-en-maquina-plate-loaded-2/"},{"musculo":"ESPALDA","nombre":"Low Row énfasis espalda alta","link":"https://www.sergiomcoach.com/topics/44-low-row-enfasis-espalda-alta-2/"},{"musculo":"ESPALDA","nombre":"Remo Kroc","link":"https://www.sergiomcoach.com/topics/45-remo-kroc-2/"},{"musculo":"ESPALDA","nombre":"Retracciones Escapulares en polea","link":"https://www.sergiomcoach.com/topics/45-retracciones-escapulares-en-polea-2/"},{"musculo":"ESPALDA","nombre":"Low Row unilateral de pie","link":"https://www.sergiomcoach.com/topics/47-low-row-unilateral-de-pie-2/"},{"musculo":"ESPALDA","nombre":"Low Row énfasis en dorsal ancho","link":"https://www.sergiomcoach.com/topics/48-low-row-sentado-enfasis-en-dorsal-ancho-2/"},{"musculo":"ESPALDA","nombre":"Jalón al pecho Half Kneeling","link":"https://www.sergiomcoach.com/topics/49-jalon-al-pecho-half-kneeling-unilateral-2/"},{"musculo":"ESPALDA","nombre":"Single Arm Multipower Row","link":"https://www.sergiomcoach.com/topics/50-single-arm-multipower-row-2/"},{"musculo":"ESPALDA","nombre":"Aducciones para dorsal ancho en máquina","link":"https://www.sergiomcoach.com/topics/51-aducciones-para-dorsal-ancho-en-maquina-2/"},{"musculo":"ESPALDA","nombre":"Kassem Pull Down","link":"https://www.sergiomcoach.com/topics/52-kassem-pull-down-2/"},{"musculo":"ESPALDA","nombre":"Remo con barra prono","link":"https://www.sergiomcoach.com/topics/53-remo-con-barra-prono-bent-over-row-2/"},{"musculo":"ESPALDA","nombre":"Remo con trap Bar","link":"https://www.sergiomcoach.com/topics/54-remo-con-trap-bar-2/"},{"musculo":"ESPALDA","nombre":"Remo pendular énfasis en dorsal ancho","link":"https://www.sergiomcoach.com/topics/55-remo-pendular-enfasis-en-dorsal-ancho-2/"},{"musculo":"ESPALDA","nombre":"Remo pendular énfasis espalda alta","link":"https://www.sergiomcoach.com/topics/56-remo-pendular-enfasis-en-espalda-alta-2/"},{"musculo":"ESPALDA","nombre":"Extensiones lumbares en máquina","link":"https://www.sergiomcoach.com/topics/extension-lumbar-en-maquina/"},{"musculo":"TRAPECIO","nombre":"Encogimientos con mancuernas de pie","link":"https://www.sergiomcoach.com/topics/1-encogimientos-con-mancuernas-de-pie-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos con barra de pie","link":"https://www.sergiomcoach.com/topics/2-encogimientos-con-barra-de-pie-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos en polea de pie","link":"https://www.sergiomcoach.com/topics/3-encogimientos-en-polea-de-pie-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos en máquina de press","link":"https://www.sergiomcoach.com/topics/4-encogimientos-en-maquina-de-press-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos tumbado en banco inclinado","link":"https://www.sergiomcoach.com/topics/5-encogimientos-tumbado-en-banco-inclinado-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos para trapecio en banco inclinado","link":"https://www.sergiomcoach.com/topics/6-encogimientos-para-trapecio-en-banco-inclinado-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos para trapecio en multipower","link":"https://www.sergiomcoach.com/topics/7-encogimientos-para-trapecio-en-multipower-wide-grip-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos con trap bar","link":"https://www.sergiomcoach.com/topics/8-encogimientos-con-trap-bar-2/"},{"musculo":"TRAPECIO","nombre":"Encogimientos para trapecio en polea a 1 mano","link":"https://www.sergiomcoach.com/topics/9-encogimientos-para-trapecio-en-polea-a-1-mano-2/"},{"musculo":"TRAPECIO","nombre":"Farmer Walks","link":"https://www.sergiomcoach.com/topics/10-farmer-walks-con-trap-bar-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Pájaros con mancuerna de pie","link":"https://www.sergiomcoach.com/topics/1-pajaros-con-mancuerna-de-pie-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Pájaros desde polea baja a 2 manos","link":"https://www.sergiomcoach.com/topics/2-pajaros-desde-polea-baja-a-2-manos-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Pájaros con mancuernas en banco inclinado","link":"https://www.sergiomcoach.com/topics/3-pajaros-con-mancuernas-en-banco-inclinado-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Reverse Cable Cross","link":"https://www.sergiomcoach.com/topics/4-reverse-cable-cross-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Abducción unilatleral en polea","link":"https://www.sergiomcoach.com/topics/5-abduccion-unilateral-en-polea-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Contractora invertida","link":"https://www.sergiomcoach.com/topics/6-contractora-invertida-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Hang & Swing","link":"https://www.sergiomcoach.com/topics/7-hang-swing-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Hang & Swing en polea","link":"https://www.sergiomcoach.com/topics/8-hang-swing-en-polea-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Reverse Cable Cross","link":"https://www.sergiomcoach.com/topics/9-reverse-cable-cross-en-banco-inclinado-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Pájaros unilaterales en polea baja","link":"https://www.sergiomcoach.com/topics/10-pajaros-unilaterales-en-polea-baja-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Extensiones de hombro para deltoides posterior","link":"https://www.sergiomcoach.com/topics/11-extensiones-de-hombro-para-deltoides-posterior-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"Rear Delt Row","link":"https://www.sergiomcoach.com/topics/12-rear-delt-row-2/"},{"musculo":"DELTOIDES POSTERIOR","nombre":"FacePull","link":"https://www.sergiomcoach.com/topics/13-facepull-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales de pie","link":"https://www.sergiomcoach.com/topics/1-elevaciones-laterales-de-pie-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales sentado","link":"https://www.sergiomcoach.com/topics/2-elevaciones-laterales-sentado-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales tumbado en banco 45º","link":"https://www.sergiomcoach.com/topics/3-elevaciones-laterales-en-banco-inclinado-45o-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales en polea baja unilateral","link":"https://www.sergiomcoach.com/topics/4-elevaciones-laterales-en-polea-baja-unilateral-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales en polea baja a 2 manos","link":"https://www.sergiomcoach.com/topics/5-elevaciones-laterales-en-polea-baja-a-2-manos-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales en máquina sentado","link":"https://www.sergiomcoach.com/topics/6-elevaciones-laterales-en-maquina-sentado-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales tumbado en polea","link":"https://www.sergiomcoach.com/topics/7-elevaciones-laterales-tumbado-en-polea-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales Y","link":"https://www.sergiomcoach.com/topics/8-elevaciones-laterales-y-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Remo al mentón en multipower","link":"https://www.sergiomcoach.com/topics/9-remo-al-menton-en-multipower-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Remo al mentón con barra","link":"https://www.sergiomcoach.com/topics/10-remo-al-menton-con-barra-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Remo al mentón desde polea baja","link":"https://www.sergiomcoach.com/topics/11-remo-al-menton-desde-polea-baja-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Remo al mentón con mancuernas","link":"https://www.sergiomcoach.com/topics/12-remo-al-menton-con-mancuernas-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales estilo egipcio","link":"https://www.sergiomcoach.com/topics/13-elevaciones-laterales-estilo-egipcio-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Butterfly lateral Raises","link":"https://www.sergiomcoach.com/topics/14-butterfly-lateral-raises-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales con rotacón interna","link":"https://www.sergiomcoach.com/topics/15-elevaciones-laterales-con-inclinacion-rot-interna-charles-glass-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales con mancuerna apoyado lateralmente en banco inclinado","link":"https://www.sergiomcoach.com/topics/16-elevaciones-laterales-con-mancuerna-apoyado-lateralmente-en-banco-inclinado-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales cable altura cadera","link":"https://www.sergiomcoach.com/topics/17-elevaciones-laterales-en-polea-cable-altura-cadera-2/"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales en polea pecho apoyado en banco","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2482"},{"musculo":"DELTOIDES LATERAL","nombre":"Elevaciones laterales apoyado en banco a 80º","link":"https://www.sergiomcoach.com/topics/19-elevaciones-laterales-con-mancuerna-banco-a-80o-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Press militar sentado en multipower","link":"https://www.sergiomcoach.com/topics/1-press-militar-sentado-en-multipower-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"High incline Dumbell shoulder press","link":"https://www.sergiomcoach.com/topics/2-high-incline-dumbell-shoulder-press-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"High incline multipower shoulder press","link":"https://www.sergiomcoach.com/topics/3-high-incline-multipower-shoulder-press-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Press militar en máquina","link":"https://www.sergiomcoach.com/topics/4-press-militar-en-maquina-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Press militar half kneeling","link":"https://www.sergiomcoach.com/topics/5-press-militar-half-kneeling-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Elevaciones frontales con barra de pie","link":"https://www.sergiomcoach.com/topics/6-elevaciones-frontales-de-pie-con-barra-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Elevaciones frontales en polea baja","link":"https://www.sergiomcoach.com/topics/7-elevaciones-frontales-en-polea-baja-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Press militar inverso en máquina","link":"https://www.sergiomcoach.com/topics/8-press-militar-inverso-en-maquina-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Elevaciones frontales en banco inclinado","link":"https://www.sergiomcoach.com/topics/9-elevaciones-frontales-con-barra-en-banco-inclinado-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Elevaciones frontales desde polea baja en banco inclinado","link":"https://www.sergiomcoach.com/topics/10-elevaciones-frontales-desde-polea-baja-en-banco-inclinado-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Elevaciones frontales con barra tumbado boca arriba en banco inclinado","link":"https://www.sergiomcoach.com/topics/11-elevaciones-frontales-con-barra-tumbado-en-banco-inclinado-boca-arriba-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Press militar con barra","link":"https://www.sergiomcoach.com/topics/12-press-militar-con-barra-2/"},{"musculo":"DELTOIDES ANTERIOR","nombre":"Shoulder Landmine Press","link":"https://www.sergiomcoach.com/topics/13-shoulder-landmine-press-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo con mancuerna trasnuca","link":"https://www.sergiomcoach.com/topics/1-extensiones-de-codo-con-mancuerna-trasnuca-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea trasnuca con cuerda","link":"https://www.sergiomcoach.com/topics/2-extensiones-de-codo-en-polea-trasnuca-con-cuerda-en-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés con mancuernas tumbado","link":"https://www.sergiomcoach.com/topics/3-press-frances-con-mancuernas-tumbado-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés con barra tumbado","link":"https://www.sergiomcoach.com/topics/4-press-frances-con-barra-tumbado-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés con barra de pie","link":"https://www.sergiomcoach.com/topics/5-press-frances-con-barra-de-pie-2/"},{"musculo":"TRÍCEPS","nombre":"Rompecráneos con barra EZ","link":"https://www.sergiomcoach.com/topics/6-rompecraneos-con-barra-ez-2/"},{"musculo":"TRÍCEPS","nombre":"Fondos para tríceps","link":"https://www.sergiomcoach.com/topics/7-fondos-para-triceps-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo cruzadas o en X","link":"https://www.sergiomcoach.com/topics/8-extensiones-de-codo-cruzadas-o-en-x-2/"},{"musculo":"TRÍCEPS","nombre":"Extensión lateral de codo","link":"https://www.sergiomcoach.com/topics/9-extension-lateral-de-codo-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea con hombro a 90º de pie","link":"https://www.sergiomcoach.com/topics/10-extensiones-de-codo-sentado-en-polea-hombro-a-90o-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea con hombro a 90º sentado","link":"https://www.sergiomcoach.com/topics/11-extensiones-de-codo-en-polea-con-hombro-a-90o-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones Katana","link":"https://www.sergiomcoach.com/topics/12-extensiones-katana-2/"},{"musculo":"TRÍCEPS","nombre":"Cable Tate Press","link":"https://www.sergiomcoach.com/topics/13-cable-tate-press-2/"},{"musculo":"TRÍCEPS","nombre":"Kaz Press","link":"https://www.sergiomcoach.com/topics/14-kaz-press-2/"},{"musculo":"TRÍCEPS","nombre":"JM Press","link":"https://www.sergiomcoach.com/topics/15-jm-press-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea alta trasnuca","link":"https://www.sergiomcoach.com/topics/17-extensiones-de-codo-en-polea-alta-trasnuca-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea V1","link":"https://www.sergiomcoach.com/topics/16-extensiones-de-codo-en-polea-v1-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea V2","link":"https://www.sergiomcoach.com/topics/18-extensiones-de-codo-en-polea-alta-con-barra-v2-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en polea V3","link":"https://www.sergiomcoach.com/topics/19-extensiones-de-codo-en-polea-alta-con-barra-v3-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés en polea baja","link":"https://www.sergiomcoach.com/topics/20-press-frances-en-polea-baja-2/"},{"musculo":"TRÍCEPS","nombre":"Tate Press con mancuernas","link":"https://www.sergiomcoach.com/topics/21-tate-press-con-mancuernas-2/"},{"musculo":"TRÍCEPS","nombre":"Push down torso inclinado unilateral","link":"https://www.sergiomcoach.com/topics/22-push-down-torso-inclinado-unilateral-2/"},{"musculo":"TRÍCEPS","nombre":"Patada en polea baja","link":"https://www.sergiomcoach.com/topics/23-patada-en-polea-baja-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés en máquina","link":"https://www.sergiomcoach.com/topics/24-press-frances-en-maquina-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo desde pecho en polea","link":"https://www.sergiomcoach.com/topics/25-extensiones-de-todo-desde-pecho-en-polea-2/"},{"musculo":"TRÍCEPS","nombre":"Patada en polea tumbado","link":"https://www.sergiomcoach.com/topics/26-patada-en-polea-tumbado-2/"},{"musculo":"TRÍCEPS","nombre":"Push down polea a la espalda","link":"https://www.sergiomcoach.com/topics/27-push-down-polea-a-la-espalda-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo en máquina","link":"https://www.sergiomcoach.com/topics/28-extensiones-de-codo-en-maquina-2/"},{"musculo":"TRÍCEPS","nombre":"Push down con single handles","link":"https://www.sergiomcoach.com/topics/29-push-down-con-single-handles-2/"},{"musculo":"TRÍCEPS","nombre":"Press francés con mancuernas sentado","link":"https://www.sergiomcoach.com/topics/30-press-frances-con-mancuernas-sentado-2/"},{"musculo":"TRÍCEPS","nombre":"Extensiones katana con mancuerna","link":"https://www.sergiomcoach.com/topics/31-extensiones-katana-con-mancuerna/"},{"musculo":"TRÍCEPS","nombre":"Extensiones de codo tumbado en banco inclinado","link":"https://www.sergiomcoach.com/topics/31-extensiones-de-codo-tumbado-en-banco-inclinado-2/"},{"musculo":"TRÍCEPS","nombre":"Rapunzel PushDowns","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2530"},{"musculo":"TRÍCEPS","nombre":"Extensiones en polea alta con cuerda","link":"https://www.sergiomcoach.com/topics/33-extensiones-en-polea-alta-con-cuerda-2/"},{"musculo":"TRÍCEPS","nombre":"PJR Pull Over","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2532"},{"musculo":"BÍCEPS","nombre":"Curl con barra de pie","link":"https://www.sergiomcoach.com/topics/curl/"},{"musculo":"BÍCEPS","nombre":"Curl martillo con mancuernas","link":"https://www.sergiomcoach.com/topics/2-curl-martillo-con-mancuernas-2/"},{"musculo":"BÍCEPS","nombre":"Curl con barra romana","link":"https://www.sergiomcoach.com/topics/3-curl-con-barra-romana-2/"},{"musculo":"BÍCEPS","nombre":"Curl con mancuernas sentado","link":"https://www.sergiomcoach.com/topics/4-curl-con-mancuernas-sentado-2/"},{"musculo":"BÍCEPS","nombre":"Drag Curl","link":"https://www.sergiomcoach.com/topics/5-drag-curl-con-barra-2/"},{"musculo":"BÍCEPS","nombre":"Curl tumbado en banco inclinado","link":"https://www.sergiomcoach.com/topics/6-curl-tumbado-en-banco-inclinado-2/"},{"musculo":"BÍCEPS","nombre":"Curl bayesian sentado","link":"https://www.sergiomcoach.com/topics/7-curl-bayesian-sentado-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador con mancuerna a 1 mano","link":"https://www.sergiomcoach.com/topics/8-curl-predicador-con-mancuerna-a-1-mano-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador en máquina","link":"https://www.sergiomcoach.com/topics/9-curl-predicador-en-maquina-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador en polea baja unilateral con banco","link":"https://www.sergiomcoach.com/topics/10-curl-predicador-en-polea-baja-unilateral-con-banco-2/"},{"musculo":"BÍCEPS","nombre":"Curl con barra en polea de pie","link":"https://www.sergiomcoach.com/topics/11-curl-con-barra-en-polea-baja-de-pie-2/"},{"musculo":"BÍCEPS","nombre":"Curl araña con mancuernas","link":"https://www.sergiomcoach.com/topics/12-curl-arana-con-mancuernas-2/"},{"musculo":"BÍCEPS","nombre":"Curl araña con barra","link":"https://www.sergiomcoach.com/topics/13-curl-arana-con-barra-2/"},{"musculo":"BÍCEPS","nombre":"Curl araña en polea","link":"https://www.sergiomcoach.com/topics/14-curl-arana-en-polea-2/"},{"musculo":"BÍCEPS","nombre":"Curl sentado en máquina","link":"https://www.sergiomcoach.com/topics/15-curl-sentado-en-maquina-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador en polea baja de pie","link":"https://www.sergiomcoach.com/topics/16-curl-predicador-de-pie-en-polea-baja-2/"},{"musculo":"BÍCEPS","nombre":"Doble bíceps en polea","link":"https://www.sergiomcoach.com/topics/19-curl-concentrado-con-mancuerna-2/"},{"musculo":"BÍCEPS","nombre":"Curl concentrado con mancuerna","link":"https://www.sergiomcoach.com/topics/20-guillotine-curl-2/"},{"musculo":"BÍCEPS","nombre":"Curl martillo en polea baja","link":"https://www.sergiomcoach.com/topics/17-curl-martillo-en-polea-baja-2/"},{"musculo":"BÍCEPS","nombre":"Guillotine Curl","link":"https://www.sergiomcoach.com/topics/20-guillotine-curl-2/"},{"musculo":"BÍCEPS","nombre":"Predicador en polea alta","link":"https://www.sergiomcoach.com/topics/21-curl-predicador-en-polea-alta-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador inverso","link":"https://www.sergiomcoach.com/topics/22-curl-predicador-inverso-2/"},{"musculo":"BÍCEPS","nombre":"Curl predicador con barra","link":"https://www.sergiomcoach.com/topics/23-curl-predicador-con-barra-2/"},{"musculo":"BÍCEPS","nombre":"Curl tumbado en polea crucifix","link":"https://www.sergiomcoach.com/topics/24-curl-tumbado-en-poleas-crucifix-2/"},{"musculo":"BÍCEPS","nombre":"Curl en banco inclinado en polea alta","link":"https://www.sergiomcoach.com/topics/25-curl-en-banco-inclinado-en-polea-alta-2/"},{"musculo":"BÍCEPS","nombre":"Curl en banco inclinado en polea baja","link":"https://www.sergiomcoach.com/topics/26-curl-en-banco-inclinado-en-polea-baja-2/"},{"musculo":"BÍCEPS","nombre":"Curl bayesian unilateral de pie","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2560"},{"musculo":"BÍCEPS","nombre":"Seated High curl","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2561"},{"musculo":"ANTEBRAZO","nombre":"Extensión de muñeca con barra","link":"https://www.sergiomcoach.com/topics/1-extension-de-muneca-con-barra-2/"},{"musculo":"ANTEBRAZO","nombre":"Extensión de muñeca con mancuerna","link":"https://www.sergiomcoach.com/topics/2-extension-de-muneca-con-mancuerna-2/"},{"musculo":"ANTEBRAZO","nombre":"Curl de muñeca con barra","link":"https://www.sergiomcoach.com/topics/3-curl-de-muneca-con-barra-2/"},{"musculo":"ANTEBRAZO","nombre":"Curl de muñeca con mancuerna","link":"https://www.sergiomcoach.com/topics/4-curl-de-muneca-con-mancuerna-2/"},{"musculo":"ANTEBRAZO","nombre":"Curl de muñeca en polea baja","link":"https://www.sergiomcoach.com/topics/5-curl-de-muneca-en-polea-baja-2/"},{"musculo":"ANTEBRAZO","nombre":"Rolling Barbell Twist","link":"https://www.sergiomcoach.com/topics/6-rolling-barbell-twist-2/"},{"musculo":"ANTEBRAZO","nombre":"Curl de muñeca sentado","link":"https://www.sergiomcoach.com/topics/7-curl-de-muneca-sentado-en-polea-2/"},{"musculo":"ANTEBRAZO","nombre":"Kettlebell Wrist Turns","link":"https://www.sergiomcoach.com/topics/8-kettlebell-wrist-turns-2/"},{"musculo":"ANTEBRAZO","nombre":"Agarre en máquina para antebrazo","link":"https://www.sergiomcoach.com/topics/9-agarre-prension-en-maquina-para-antebrazo-2/"},{"musculo":"ANTEBRAZO","nombre":"Extensión de muñeca en polea baja","link":"https://www.sergiomcoach.com/topics/10-extension-de-muneca-en-polea-baja/"},{"musculo":"ABDOMEN","nombre":"Ab Wheel Roll Out","link":"https://www.sergiomcoach.com/topics/1-ab-wheel-ab-roll-out-2/"},{"musculo":"ABDOMEN","nombre":"Body Saw","link":"https://www.sergiomcoach.com/topics/2-body-saw-2/"},{"musculo":"ABDOMEN","nombre":"V Ups","link":"https://www.sergiomcoach.com/topics/3-v-ups-2/"},{"musculo":"ABDOMEN","nombre":"Stir the pot","link":"https://www.sergiomcoach.com/topics/4-stir-the-pot-2/"},{"musculo":"ABDOMEN","nombre":"Crunch en polea alta","link":"https://www.sergiomcoach.com/topics/5-crunch-en-polea-alta-2/"},{"musculo":"ABDOMEN","nombre":"Crunch en máquina sentado","link":"https://www.sergiomcoach.com/topics/6-crunch-en-maquina-sentado-2/"},{"musculo":"ABDOMEN","nombre":"Hanging leg raises","link":"https://www.sergiomcoach.com/topics/7-hanging-leg-raises-2/"},{"musculo":"ABDOMEN","nombre":"Encogimientos de piernas al pecho en banco plano","link":"https://www.sergiomcoach.com/topics/8-encogimientos-de-piernas-al-pecho-en-banco-plano-2/"},{"musculo":"ABDOMEN","nombre":"Crunch abdominal","link":"https://www.sergiomcoach.com/topics/9-crunch-abdominal-2/"},{"musculo":"ABDOMEN","nombre":"Wood Chopper","link":"https://www.sergiomcoach.com/topics/10-wood-chopper-2/"},{"musculo":"ABDOMEN","nombre":"Press Pallof","link":"https://www.sergiomcoach.com/topics/11-press-pallof-2/"},{"musculo":"ABDOMEN","nombre":"Crunch inverso en banco declinado","link":"https://www.sergiomcoach.com/topics/12-crunch-inverso-en-banco-declinado-2/"},{"musculo":"ABDOMEN","nombre":"Suitcase Carry","link":"https://www.sergiomcoach.com/topics/13-suitcase-carry-2/"},{"musculo":"ABDOMEN","nombre":"Pike","link":"https://www.sergiomcoach.com/topics/14-pike-2/"},{"musculo":"ABDOMEN","nombre":"Crunch en máquina tumbado","link":"https://www.sergiomcoach.com/topics/15-crunch-en-maquina-tumbado-2/"},{"musculo":"ABDOMEN","nombre":"Crunch en polea en banco declinado","link":"https://www.sergiomcoach.com/topics/16-crunch-en-polea-baja-en-banco-declinado-2/"},{"musculo":"GLÚTEO","nombre":"Hipthrust","link":"https://www.sergiomcoach.com/topics/1-hipthrust-2/"},{"musculo":"GLÚTEO","nombre":"Skorcher Hiptrhust","link":"https://www.sergiomcoach.com/topics/2-skorcher-hipthrust-2/"},{"musculo":"GLÚTEO","nombre":"GluteBridge","link":"https://www.sergiomcoach.com/topics/3-glutebridge-2/"},{"musculo":"GLÚTEO","nombre":"Hipthrust Unilateral con mancuerna","link":"https://www.sergiomcoach.com/topics/4-hipthrust-unilateral-con-mancuerna-2/"},{"musculo":"GLÚTEO","nombre":"Hipthrust Unilateral con barra","link":"https://www.sergiomcoach.com/topics/5-hiptrhust-unilateral-con-barra-2/"},{"musculo":"GLÚTEO","nombre":"Hiptrhust en máquina","link":"https://www.sergiomcoach.com/topics/6-hipthrust-en-maquina-2/"},{"musculo":"GLÚTEO","nombre":"Cable Pull Through","link":"https://www.sergiomcoach.com/topics/7-cable-pull-through-2/"},{"musculo":"GLÚTEO","nombre":"Cable Kick Back","link":"https://www.sergiomcoach.com/topics/8-cable-kick-back-2/"},{"musculo":"GLÚTEO","nombre":"Leg Swing","link":"https://www.sergiomcoach.com/topics/9-leg-swing-2/"},{"musculo":"GLÚTEO","nombre":"Abducciones en máquina sentado","link":"https://www.sergiomcoach.com/topics/10-abducciones-en-maquina-sentado-2/"},{"musculo":"GLÚTEO","nombre":"Clam shell 3D","link":"https://www.sergiomcoach.com/topics/11-clam-shell-3d-2/"},{"musculo":"GLÚTEO","nombre":"Reverse glute hyperextensions en multipower","link":"https://www.sergiomcoach.com/topics/12-reverse-glute-hyperextensions-en-multipower-2/"},{"musculo":"GLÚTEO","nombre":"Patada de glúteo en multipower","link":"https://www.sergiomcoach.com/topics/13-patada-de-gluteo-en-cuadrupedia-en-multipower-2/"},{"musculo":"GLÚTEO","nombre":"Hiperextensiones 45º foco glúteo","link":"https://www.sergiomcoach.com/topics/14-hiperextensiones-45o-foco-gluteo-2/"},{"musculo":"GLÚTEO","nombre":"Clam Shell","link":"https://www.sergiomcoach.com/topics/15-clam-shell-2/"},{"musculo":"GLÚTEO","nombre":"Abducciones con miniband","link":"https://www.sergiomcoach.com/topics/14-abducciones-con-miniband-2/"},{"musculo":"GLÚTEO","nombre":"Patada de glúteo en cuadrupedia en polea baja","link":"https://www.sergiomcoach.com/topics/16-patada-de-gluteo-en-cuadrupedia-en-polea-2"},{"musculo":"GLÚTEO","nombre":"FrogPumps","link":"https://www.sergiomcoach.com/topics/18-frogpumps-2/"},{"musculo":"GLÚTEO","nombre":"Kick Back en máquina","link":"https://www.sergiomcoach.com/topics/19-kick-back-en-maquina-2/"},{"musculo":"GLÚTEO","nombre":"Reverse glute hyperextensions en máquina","link":"https://www.sergiomcoach.com/topics/20-reverse-glutehyperextensions-en-maquina-2/"},{"musculo":"GLÚTEO","nombre":"MonsterWalks","link":"https://www.sergiomcoach.com/topics/18-monster-walks-2/"},{"musculo":"GLÚTEO","nombre":"Glute Press Down","link":"https://www.sergiomcoach.com/topics/22-glute-press-down-2/"},{"musculo":"GLÚTEO","nombre":"Leg Swing en máquina","link":"https://www.sergiomcoach.com/topics/23-leg-swing-en-maquina-2/"},{"musculo":"GLÚTEO","nombre":"Prensa de piernas énfasis glúteo","link":"https://www.sergiomcoach.com/topics/24-prensa-de-piernas-enfasis-gluteo-2/"},{"musculo":"GLÚTEO","nombre":"Sentadilla búlgara énfasis glúteo","link":"https://www.sergiomcoach.com/topics/25-sentadilla-bulgara-enfasis-gluteo-2/"},{"musculo":"GLÚTEO","nombre":"Abducciones en máquina de pie","link":"https://www.sergiomcoach.com/topics/26-abducciones-en-maquina-de-pie-sentado-2/"},{"musculo":"GLÚTEO","nombre":"Glute Ham Raise énfasis Glúteo","link":"https://www.sergiomcoach.com/topics/27-glute-ham-raise-enfasis-gluteo-2/"},{"musculo":"GLÚTEO","nombre":"Patada de glúteo en máquina de pie","link":"https://www.sergiomcoach.com/topics/28-patada-de-gluteo-en-maquina-de-placas-de-pie-2/"},{"musculo":"GLÚTEO","nombre":"Hiptrhust en multipower","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2618"},{"musculo":"GLÚTEO","nombre":"Cable Kick back en banco inclinado","link":"https://www.sergiomcoach.com/topics/30-cable-kick-back-en-banco-inclinado/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla en multipower","link":"https://www.sergiomcoach.com/topics/1-sentadilla-en-multipower-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla Hack","link":"https://www.sergiomcoach.com/topics/2-sentadilla-hack-2/"},{"musculo":"CUÁDRICEPS","nombre":"Split squat en multipower","link":"https://www.sergiomcoach.com/topics/3-split-squat-en-multipower-2/"},{"musculo":"CUÁDRICEPS","nombre":"Split squat libre","link":"https://www.sergiomcoach.com/topics/4-split-squat-libre-2/"},{"musculo":"CUÁDRICEPS","nombre":"Prensa 45º","link":"https://www.sergiomcoach.com/topics/5-prensa-45o-2/"},{"musculo":"CUÁDRICEPS","nombre":"Prensa horizontal","link":"https://www.sergiomcoach.com/topics/6-prensa-horizontal-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla búlgara en multipower","link":"https://www.sergiomcoach.com/topics/7-sentadilla-bulgara-en-multipower-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla búlgara con mancuerna + apoyo de mano","link":"https://www.sergiomcoach.com/topics/8-sentadilla-bulgara-con-mancuerna-apoyo-de-mano-2/"},{"musculo":"CUÁDRICEPS","nombre":"Leg Extensions","link":"https://www.sergiomcoach.com/topics/9-leg-extensions-2/"},{"musculo":"CUÁDRICEPS","nombre":"Zancadas con mancuerna","link":"https://www.sergiomcoach.com/topics/10-zancadas-con-mancuerna-2/"},{"musculo":"CUÁDRICEPS","nombre":"Pendulum Squat","link":"https://www.sergiomcoach.com/topics/11-pendulum-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Prensa horizontal plate loaded","link":"https://www.sergiomcoach.com/topics/12-prensa-horizontal-pendular-plate-loaded-2/"},{"musculo":"CUÁDRICEPS","nombre":"Belt squat","link":"https://www.sergiomcoach.com/topics/13-belt-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla búlgara libre con barra","link":"https://www.sergiomcoach.com/topics/14-sentadilla-bulgara-libre-con-barra-2/"},{"musculo":"CUÁDRICEPS","nombre":"Safety Bar Squat","link":"https://www.sergiomcoach.com/topics/15-safety-bar-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla libre barra alta","link":"https://www.sergiomcoach.com/topics/16-sentadilla-libre-barra-alta-2/"},{"musculo":"CUÁDRICEPS","nombre":"High Step Up","link":"https://www.sergiomcoach.com/topics/17-high-step-up-2/"},{"musculo":"CUÁDRICEPS","nombre":"Vertical Leg Press","link":"https://www.sergiomcoach.com/topics/18-vertical-leg-press-prensa-vertical-2/"},{"musculo":"CUÁDRICEPS","nombre":"Reverse V Squat","link":"https://www.sergiomcoach.com/topics/19-reverse-v-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"V squat","link":"https://www.sergiomcoach.com/topics/20-v-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sissy Squat","link":"https://www.sergiomcoach.com/topics/21-sissy-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Hatfield Squat","link":"https://www.sergiomcoach.com/topics/22-hatfield-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sissy Squat en Silla Romana","link":"https://www.sergiomcoach.com/topics/23-sissy-squat-en-silla-romana-2/"},{"musculo":"CUÁDRICEPS","nombre":"Platz Hack Squat","link":"https://www.sergiomcoach.com/topics/24-platz-hack-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Platz Squat en multipower","link":"https://www.sergiomcoach.com/topics/25-platz-squat-en-multipower-2/"},{"musculo":"CUÁDRICEPS","nombre":"Kneeling Leg","link":"https://www.sergiomcoach.com/topics/26-kneeling-leg-extensions-2/"},{"musculo":"CUÁDRICEPS","nombre":"Hatfield Split Squat","link":"https://www.sergiomcoach.com/topics/27-hatfield-split-squat-2/"},{"musculo":"CUÁDRICEPS","nombre":"Sentadilla frontal","link":"https://www.sergiomcoach.com/topics/28-sentadilla-frontal-2/"},{"musculo":"CUÁDRICEPS","nombre":"Prensa pendular","link":"https://www.sergiomcoach.com/topics/29-prensa-pendular-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto Rumano RDL","link":"https://www.sergiomcoach.com/topics/1-peso-muerto-rumano-rdl-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto Piernas Rígidas SLDL","link":"https://www.sergiomcoach.com/topics/2-peso-muerto-piernas-rigidas-sldl-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto unilateral con mancuerna","link":"https://www.sergiomcoach.com/topics/3-peso-muerto-unilateral-con-mancuerna-2/"},{"musculo":"ISQUIOSURALES","nombre":"Buenos días con multipower","link":"https://www.sergiomcoach.com/topics/4-buenos-dias-en-multipower-2/"},{"musculo":"ISQUIOSURALES","nombre":"Leg Curl tumbado","link":"https://www.sergiomcoach.com/topics/5-leg-curl-tumbado-2/"},{"musculo":"ISQUIOSURALES","nombre":"Leg curl sentado","link":"https://www.sergiomcoach.com/topics/6-leg-curl-sentado-2/"},{"musculo":"ISQUIOSURALES","nombre":"Leg curl tumbado con mancuerna","link":"https://www.sergiomcoach.com/topics/7-leg-curl-tumbado-con-mancuerna-2/"},{"musculo":"ISQUIOSURALES","nombre":"Hiperextensiones 45º foco isquiosurales","link":"https://www.sergiomcoach.com/topics/8-hiperextensiones-foco-isquiosurales-2/"},{"musculo":"ISQUIOSURALES","nombre":"Buenos días con barra libre","link":"https://www.sergiomcoach.com/topics/9-buenos-dias-con-barra-libre-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto unilateral con barra","link":"https://www.sergiomcoach.com/topics/10-peso-muerto-unilateral-con-barra-2/"},{"musculo":"ISQUIOSURALES","nombre":"Leg curl en polea de pie","link":"https://www.sergiomcoach.com/topics/11-leg-curl-en-polea-de-pie-2/"},{"musculo":"ISQUIOSURALES","nombre":"Leg curl en máquina de pie","link":"https://www.sergiomcoach.com/topics/12-leg-curl-en-maquina-de-pie-2/"},{"musculo":"ISQUIOSURALES","nombre":"Glute Ham Raises énfasis isquiosurales","link":"https://www.sergiomcoach.com/topics/13-glute-ham-raise-enfasis-isquosurales-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto Rumano con mancuernas","link":"https://www.sergiomcoach.com/topics/14-peso-muerto-rumano-con-mancuernas-rdl-con-mancuernas-2/"},{"musculo":"ISQUIOSURALES","nombre":"Peso muerto en máquina","link":"https://www.sergiomcoach.com/topics/15-peso-muerto-en-maquina-2/"},{"musculo":"ISQUIOSURALES","nombre":"Slide Leg Curl","link":"https://www.sergiomcoach.com/topics/16-slide-leg-curl-2/"},{"musculo":"ISQUIOSURALES","nombre":"Buenos días con Safety Bar","link":"https://www.sergiomcoach.com/topics/17-buenos-dias-con-safety-bar-2/"},{"musculo":"GEMELOS","nombre":"Elevaciones de talón en déficit en multipower","link":"https://www.sergiomcoach.com/topics/1-elevaciones-de-talon-en-deficit-en-multipower-2/"},{"musculo":"GEMELOS","nombre":"Elevaciones de talón unilaterales con mancuerna en déficit","link":"https://www.sergiomcoach.com/topics/2-elevaciones-de-talon-unilaterales-con-mancuerna-en-deficit-2/"},{"musculo":"GEMELOS","nombre":"Sóleo sentado con mancuerna","link":"https://www.sergiomcoach.com/topics/3-soleo-sentado-con-mancuerna-2/"},{"musculo":"GEMELOS","nombre":"Gemelo en prensa","link":"https://www.sergiomcoach.com/topics/4-gemelo-en-prensa-2/"},{"musculo":"GEMELOS","nombre":"Gemelo en máquina inclinada","link":"https://www.sergiomcoach.com/topics/5-gemelo-en-maquina-inclinada-2/"},{"musculo":"GEMELOS","nombre":"Elevaciones de talón unilaterales en multiupower en déficit","link":"https://www.sergiomcoach.com/topics/6-elevaciones-de-talon-unilaterales-en-multipower-en-deficit-2/"},{"musculo":"GEMELOS","nombre":"Gemelo en máquina de pie","link":"https://www.sergiomcoach.com/topics/7-gemelo-en-maquina-de-pie-2/"},{"musculo":"GEMELOS","nombre":"Gemelo en máquina sentado","link":"https://www.sergiomcoach.com/topics/8-gemelo-en-maquina-sentado-2/"},{"musculo":"GEMELOS","nombre":"Gemelo en multipower sentado","link":"https://www.sergiomcoach.com/?post_type=sfwd-topic&p=2676"},{"musculo":"ADUCTORES","nombre":"Aductor en máquina V1","link":"https://www.sergiomcoach.com/topics/1-aductor-en-maquina-v1-2/"},{"musculo":"ADUCTORES","nombre":"Aductor en máquina V2","link":"https://www.sergiomcoach.com/topics/2-aductor-en-maquina-v2-2/"},{"musculo":"ADUCTORES","nombre":"Aductor en polea de pie","link":"https://www.sergiomcoach.com/topics/3-aductor-en-polea-de-pie-2/"},{"musculo":"ADUCTORES","nombre":"Copenaghen Adductions","link":"https://www.sergiomcoach.com/topics/4-copenaghen-adductions-2/"},{"musculo":"ADUCTORES","nombre":"Aductor en máquina de pie","link":"https://www.sergiomcoach.com/topics/5-aductor-en-maquina-de-pie-2/"},{"musculo":"CALENTAMIENTO","nombre":"Ejercicio calentamiento ejemplo 1","link":null},{"musculo":"EJ. ACCESORIOS","nombre":"Ejercicio accesorio ejemplo 1","link":null}];


async function loadJSON(key, shared, fallback) {
  try {
    const r = await window.storage.get(key, shared);
    return r ? JSON.parse(r.value) : fallback;
  } catch {
    return fallback;
  }
}
async function saveJSON(key, value, shared) {
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
  } catch (e) {
    console.error("storage error", e);
  }
}

/* ---------------- UI primitives ---------------- */

function Stamp({ done }) {
  if (!done) return null;
  return (
    <div className="stamp">
      COMPLETO
    </div>
  );
}

function Tally({ count, target }) {
  const marks = Array.from({ length: Math.max(count, target) });
  return (
    <div className="flex flex-wrap gap-1">
      {marks.map((_, i) => (
        <span
          key={i}
          className="tally-mark"
          style={{
            opacity: i < count ? 1 : 0.25,
            background: i < count ? "var(--accent)" : "transparent",
            borderColor: i < target ? "var(--accent)" : "var(--line)",
          }}
        />
      ))}
    </div>
  );
}

function VideoModal({ url, onClose }) {
  if (!url) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="muted small">técnica del ejercicio</span>
          <button className="link-btn" onClick={onClose}>
            cerrar
          </button>
        </div>
        <iframe src={url} className="modal-iframe" title="técnica del ejercicio" />
        <a href={url} target="_blank" rel="noopener noreferrer" className="muted small modal-fallback">
          ¿no carga? ábrelo en una pestaña nueva
        </a>
      </div>
    </div>
  );
}

function ExercisePicker({ value, onSelect }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);

  useEffect(() => setQuery(value || ""), [value]);

  const matches =
    query.trim().length < 2
      ? []
      : EXERCISE_DB.filter((e) => e.nombre.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6);

  return (
    <div className="picker">
      <input
        className="inp"
        placeholder="Ejercicio (busca en tu base de datos)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          onSelect({ nombre: e.target.value, musculo: "", link: "" });
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && matches.length > 0 && (
        <div className="picker-list">
          {matches.map((m, i) => (
            <button
              key={i}
              className="picker-item"
              onMouseDown={() => {
                setQuery(m.nombre);
                onSelect(m);
                setOpen(false);
              }}
            >
              <span>{m.nombre}</span>
              <span className="muted small">{m.musculo}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

function Field({ label, as, ...props }) {
  const Tag = as === "textarea" ? "textarea" : "input";
  return (
    <label className="flex flex-col gap-1 text-sm" style={{ color: "var(--muted)" }}>
      {label}
      <Tag {...props} className={`inp ${props.className || ""}`} />
    </label>
  );
}

/* ---------------- App ---------------- */

export default function App() {
  useFonts();
  const [role, setRole] = useState(null); // 'entrenador' | 'clienta'
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await loadJSON("clientas-list", true, []);
      setClientes(list);
      setLoading(false);
    })();
  }, []);

  const addCliente = useCallback(
    async (nombre) => {
      const nuevo = { id: uid(), nombre, pin: genPin() };
      const next = [...clientes, nuevo];
      setClientes(next);
      await saveJSON("clientas-list", next, true);
      return nuevo;
    },
    [clientes]
  );

  const regenerarPin = useCallback(
    async (id) => {
      const next = clientes.map((c) => (c.id === id ? { ...c, pin: genPin() } : c));
      setClientes(next);
      await saveJSON("clientas-list", next, true);
      return next.find((c) => c.id === id);
    },
    [clientes]
  );

  const eliminarCliente = useCallback(
    async (id) => {
      const next = clientes.filter((c) => c.id !== id);
      setClientes(next);
      await saveJSON("clientas-list", next, true);
      // limpiar sus datos: rutina, historial y los registros individuales
      try {
        const idx = await loadJSON(`registros-index:${id}`, true, []);
        for (const r of idx) {
          await window.storage.delete(r.key, true).catch(() => {});
        }
        await window.storage.delete(`registros-index:${id}`, true).catch(() => {});
        await window.storage.delete(`rutina:${id}`, true).catch(() => {});
      } catch (e) {
        console.error("error limpiando datos de la clienta", e);
      }
    },
    [clientes]
  );

  return (
    <div className="app-root">
      <style>{CSS}</style>
      <header className="header">
        <div className="brand">¡BIENVENIDA!</div>
        {role && (
          <button className="link-btn" onClick={() => setRole(null)}>
            cambiar rol
          </button>
        )}
      </header>

      {loading ? (
        <div className="loading">Cargando…</div>
      ) : !role ? (
        <RoleGate onPick={setRole} />
      ) : role === "entrenador" ? (
        <EntrenadorAccess>
          <EntrenadorView
            clientes={clientes}
            addCliente={addCliente}
            regenerarPin={regenerarPin}
            eliminarCliente={eliminarCliente}
          />
        </EntrenadorAccess>
      ) : (
        <ClientaView clientes={clientes} addCliente={addCliente} />
      )}
    </div>
  );
}

/* ---------------- Acceso Entrenador (contraseña) ---------------- */

function EntrenadorAccess({ children }) {
  const [loading, setLoading] = useState(true);
  const [passGuardada, setPassGuardada] = useState(null);
  const [authOk, setAuthOk] = useState(false);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const p = await loadJSON("entrenador-pass", true, null);
      setPassGuardada(p);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="loading">Cargando…</div>;

  if (authOk) return children;

  if (!passGuardada) {
    // primera vez: crear contraseña
    const crear = async () => {
      if (input.length < 4) {
        setError("Usa al menos 4 caracteres.");
        return;
      }
      if (input !== input2) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      await saveJSON("entrenador-pass", input, true);
      setPassGuardada(input);
      setAuthOk(true);
    };
    return (
      <div className="view">
        <section className="panel">
          <h2 className="panel-title">Crea tu contraseña</h2>
          <p className="muted small">
            Es la primera vez que entras como entrenador/a. Elige una contraseña — se te pedirá cada vez que
            quieras cargar rutinas.
          </p>
          <Field label="Contraseña" type="password" value={input} onChange={(e) => setInput(e.target.value)} />
          <Field
            label="Repite la contraseña"
            type="password"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <Button onClick={crear}>Crear y entrar</Button>
        </section>
      </div>
    );
  }

  const entrar = () => {
    if (input === passGuardada) {
      setAuthOk(true);
      setError("");
    } else {
      setError("Contraseña incorrecta.");
    }
  };

  return (
    <div className="view">
      <section className="panel">
        <h2 className="panel-title">Acceso entrenador/a</h2>
        <Field
          label="Contraseña"
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && entrar()}
        />
        {error && <p className="error-text">{error}</p>}
        <Button onClick={entrar}>Entrar</Button>
      </section>
    </div>
  );
}

function RoleGate({ onPick }) {
  return (
    <div className="gate">
      <p className="gate-sub">¿Entrenamos hoy?</p>
      <div className="gate-buttons">
        <button className="gate-btn" onClick={() => onPick("entrenador")}>
          <span className="gate-btn-title">Soy entrenador/a</span>
          <span className="gate-btn-desc">Cargo rutinas por clienta</span>
        </button>
        <button className="gate-btn" onClick={() => onPick("clienta")}>
          <span className="gate-btn-title">Soy clienta</span>
          <span className="gate-btn-desc">Registro mi entrenamiento</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- Vista Entrenador ---------------- */

function EntrenadorView({ clientes, addCliente, regenerarPin, eliminarCliente }) {
  const [selId, setSelId] = useState(clientes[0]?.id || null);
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [confirmandoBaja, setConfirmandoBaja] = useState(false);

  useEffect(() => {
    if (!selId && clientes.length) setSelId(clientes[0].id);
  }, [clientes, selId]);

  useEffect(() => {
    setConfirmandoBaja(false);
  }, [selId]);

  const sel = clientes.find((c) => c.id === selId);

  return (
    <div className="view">
      <section className="panel">
        <h2 className="panel-title">Clientas</h2>
        <div className="chip-row">
          {clientes.map((c) => (
            <button
              key={c.id}
              className={`chip ${c.id === selId ? "chip-active" : ""}`}
              onClick={() => setSelId(c.id)}
            >
              {c.nombre}
            </button>
          ))}
        </div>
        <div className="add-row">
          <input
            className="inp"
            placeholder="Nombre de la nueva clienta"
            value={nombreNuevo}
            onChange={(e) => setNombreNuevo(e.target.value)}
          />
          <Button
            onClick={async () => {
              if (!nombreNuevo.trim()) return;
              const nuevo = await addCliente(nombreNuevo.trim());
              setSelId(nuevo.id);
              setNombreNuevo("");
            }}
          >
            Agregar
          </Button>
        </div>
      </section>

      {sel && (
        <section className="panel">
          <div className="pin-box">
            <div>
              <div className="muted small">PIN de acceso de {sel.nombre}</div>
              <div className="pin-display">{sel.pin}</div>
            </div>
            <Button variant="ghost" onClick={() => regenerarPin(sel.id)}>
              regenerar
            </Button>
          </div>
          <p className="muted small">
            Comparte este PIN con {sel.nombre} — junto con su nombre, es lo que usa para entrar a su perfil y
            que nadie más vea su rutina.
          </p>

          <div className="danger-zone">
            {!confirmandoBaja ? (
              <button className="link-btn danger" onClick={() => setConfirmandoBaja(true)}>
                eliminar a {sel.nombre}
              </button>
            ) : (
              <div className="confirm-row">
                <span className="muted small">
                  Esto borra su rutina y todo su historial de registros, sin poder deshacerse. ¿Confirmas?
                </span>
                <div className="confirm-buttons">
                  <Button
                    variant="ghost"
                    className="btn-danger"
                    onClick={async () => {
                      await eliminarCliente(sel.id);
                      setSelId(null);
                      setConfirmandoBaja(false);
                    }}
                  >
                    sí, eliminar
                  </Button>
                  <button className="link-btn" onClick={() => setConfirmandoBaja(false)}>
                    cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {sel && <RutinaEditor cliente={sel} />}
    </div>
  );
}

function RutinaEditor({ cliente }) {
  const [rutina, setRutina] = useState({ sessions: [] });
  const [loaded, setLoaded] = useState(false);
  const key = `rutina:${cliente.id}`;

  useEffect(() => {
    setLoaded(false);
    (async () => {
      const r = await loadJSON(key, true, { sessions: [] });
      setRutina(r);
      setLoaded(true);
    })();
  }, [key]);

  const persist = async (next) => {
    setRutina(next);
    await saveJSON(key, next, true);
  };

  const addSession = () => {
    const nombre = `Sesión ${rutina.sessions.length + 1}`;
    persist({
      sessions: [...rutina.sessions, { id: uid(), nombre, ejercicios: [] }],
    });
  };

  const updateSession = (sid, patch) => {
    persist({
      sessions: rutina.sessions.map((s) => (s.id === sid ? { ...s, ...patch } : s)),
    });
  };

  const removeSession = (sid) => {
    persist({ sessions: rutina.sessions.filter((s) => s.id !== sid) });
  };

  if (!loaded) return <div className="loading">Cargando rutina…</div>;

  return (
    <section className="panel">
      <div className="panel-header-row">
        <h2 className="panel-title">Rutina de {cliente.nombre}</h2>
        <Button variant="ghost" onClick={addSession}>
          + sesión
        </Button>
      </div>

      {rutina.sessions.length === 0 && (
        <p className="empty">Todavía no hay sesiones. Agrega la primera para empezar a cargar ejercicios.</p>
      )}

      <div className="session-list">
        {rutina.sessions.map((s) => (
          <SessionEditor
            key={s.id}
            session={s}
            onChange={(patch) => updateSession(s.id, patch)}
            onRemove={() => removeSession(s.id)}
          />
        ))}
      </div>
    </section>
  );
}

function SessionEditor({ session, onChange, onRemove }) {
  const [open, setOpen] = useState(false);
  const [ex, setEx] = useState({ nombre: "", musculo: "", link: "", series: 3, reps: 10, rir: 2 });
  const [videoUrl, setVideoUrl] = useState(null);

  const addEjercicio = () => {
    if (!ex.nombre.trim()) return;
    onChange({
      ejercicios: [
        ...session.ejercicios,
        { id: uid(), ...ex, series: Number(ex.series) || 1, reps: Number(ex.reps) || 1, rir: Number(ex.rir) || 0 },
      ],
    });
    setEx({ nombre: "", musculo: "", link: "", series: 3, reps: 10, rir: 2 });
  };

  const removeEjercicio = (id) => {
    onChange({ ejercicios: session.ejercicios.filter((e) => e.id !== id) });
  };

  return (
    <div className="card">
      <div className="card-row" onClick={() => setOpen(!open)}>
        <input
          className="inp inp-inline"
          value={session.nombre}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange({ nombre: e.target.value })}
        />
        <span className="muted small">{session.ejercicios.length} ejercicios</span>
        <button
          className="link-btn danger"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          eliminar
        </button>
      </div>

      {open && (
        <div className="card-body">
          {session.ejercicios.map((e) => (
            <div key={e.id} className="ex-row">
              <div>
                <div className="ex-nombre">{e.nombre}</div>
                <div className="muted small">
                  {e.musculo || "—"} · {e.series}×{e.reps} @ RIR {e.rir}
                  {e.link && (
                    <>
                      {" · "}
                      <button className="link-btn ex-link-btn" onClick={() => setVideoUrl(e.link)}>
                        ver técnica
                      </button>
                    </>
                  )}
                </div>
              </div>
              <button className="link-btn danger" onClick={() => removeEjercicio(e.id)}>
                x
              </button>
            </div>
          ))}

          <div className="new-ex">
            <ExercisePicker value={ex.nombre} onSelect={(m) => setEx({ ...ex, ...m })} />
            <input
              className="inp"
              placeholder="Músculo"
              value={ex.musculo}
              onChange={(v) => setEx({ ...ex, musculo: v.target.value })}
            />
            <div className="new-ex-nums">
              <input
                className="inp inp-num"
                type="number"
                placeholder="series"
                value={ex.series}
                onChange={(v) => setEx({ ...ex, series: v.target.value })}
              />
              <input
                className="inp inp-num"
                type="number"
                placeholder="reps"
                value={ex.reps}
                onChange={(v) => setEx({ ...ex, reps: v.target.value })}
              />
              <input
                className="inp inp-num"
                type="number"
                placeholder="RIR"
                value={ex.rir}
                onChange={(v) => setEx({ ...ex, rir: v.target.value })}
              />
            </div>
            <Button onClick={addEjercicio}>+ ejercicio</Button>
          </div>
        </div>
      )}
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

/* ---------------- Vista Clienta ---------------- */

function ClientaView({ clientes, addCliente }) {
  const [sel, setSel] = useState(null);
  const [nombre, setNombre] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [pinNuevo, setPinNuevo] = useState(null); // { nombre, pin } recién creado

  if (sel) {
    return <SesionLogger cliente={sel} onSalir={() => setSel(null)} />;
  }

  const ingresar = () => {
    const match = clientes.find(
      (c) => c.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && c.pin === pin.trim()
    );
    if (!match) {
      setError("Nombre o PIN incorrecto.");
      return;
    }
    setError("");
    setSel(match);
  };

  const crearPerfil = async () => {
    if (!nombre.trim()) return;
    const existe = clientes.find((c) => c.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    if (existe) {
      setError("Ya existe una clienta con ese nombre. Pide tu PIN a tu entrenador/a.");
      return;
    }
    const nuevo = await addCliente(nombre.trim());
    setPinNuevo(nuevo);
  };

  if (pinNuevo) {
    return (
      <div className="view">
        <section className="panel">
          <h2 className="panel-title">Perfil creado</h2>
          <p>Tu PIN es:</p>
          <div className="pin-display">{pinNuevo.pin}</div>
          <p className="muted small">Guárdalo — lo necesitas junto con tu nombre para volver a entrar.</p>
          <Button onClick={() => setSel(pinNuevo)}>Continuar</Button>
        </section>
      </div>
    );
  }

  return (
    <div className="view">
      <section className="panel">
        <h2 className="panel-title">Ingresa a tu perfil</h2>
        <Field label="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <Field
          label="Tu PIN (4 dígitos)"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          maxLength={4}
          inputMode="numeric"
        />
        {error && <p className="error-text">{error}</p>}
        <Button onClick={ingresar}>Entrar</Button>
        <button className="link-btn" onClick={crearPerfil}>
          Primera vez — crear mi perfil
        </button>
      </section>
    </div>
  );
}

function SesionLogger({ cliente, onSalir }) {
  const [rutina, setRutina] = useState({ sessions: [] });
  const [loaded, setLoaded] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const r = await loadJSON(`rutina:${cliente.id}`, true, { sessions: [] });
      setRutina(r);
      setLoaded(true);
      if (r.sessions[0]) setSessionId(r.sessions[0].id);
    })();
  }, [cliente.id]);

  if (!loaded) return <div className="loading">Cargando…</div>;

  const session = rutina.sessions.find((s) => s.id === sessionId);

  return (
    <div className="view">
      <div className="clienta-topbar">
        <span className="muted">Hola, </span>
        <span className="clienta-nombre">{cliente.nombre}</span>
        <button className="link-btn" onClick={onSalir}>
          no soy yo
        </button>
      </div>

      {rutina.sessions.length === 0 ? (
        <p className="empty">Tu entrenador/a todavía no cargó tu rutina.</p>
      ) : (
        <>
          <div className="chip-row">
            {rutina.sessions.map((s) => (
              <button
                key={s.id}
                className={`chip ${s.id === sessionId ? "chip-active" : ""}`}
                onClick={() => setSessionId(s.id)}
              >
                {s.nombre}
              </button>
            ))}
          </div>

          {session && <RegistroSesion cliente={cliente} session={session} />}
        </>
      )}

      <button className="link-btn" onClick={() => setHistoryOpen(!historyOpen)}>
        {historyOpen ? "ocultar historial" : "ver historial"}
      </button>
      {historyOpen && <Historial cliente={cliente} rutina={rutina} />}
    </div>
  );
}

function exKey(nombre) {
  return (nombre || "").trim().toLowerCase();
}

function compareProgreso(actual, prev) {
  if (!prev) return null;
  const aCarga = parseFloat(actual.carga);
  const aReps = parseFloat(actual.reps);
  const pCarga = parseFloat(prev.carga);
  const pReps = parseFloat(prev.reps);
  if (isNaN(aCarga) && isNaN(aReps)) return null;
  if (isNaN(pCarga) && isNaN(pReps)) return null;
  const ac = isNaN(aCarga) ? 0 : aCarga;
  const ar = isNaN(aReps) ? 0 : aReps;
  const pc = isNaN(pCarga) ? 0 : pCarga;
  const pr = isNaN(pReps) ? 0 : pReps;
  if (ac > pc || (ac === pc && ar > pr)) return "up";
  if (ac < pc || (ac === pc && ar < pr)) return "down";
  return "same";
}

function rirFlag(actualRir, objetivoRir) {
  const a = parseFloat(actualRir);
  if (isNaN(a) || objetivoRir === undefined || objetivoRir === null) return null;
  if (a < objetivoRir) return "low";
  if (a > objetivoRir) return "high";
  return null;
}

function RegistroSesion({ cliente, session }) {
  const [registro, setRegistro] = useState({ fecha: todayISO(), ejercicios: {}, notas: "" });
  const [ultima, setUltima] = useState({});
  const [prevFecha, setPrevFecha] = useState(null);
  const [saved, setSaved] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const key = `registro:${cliente.id}:${session.id}:${todayISO()}`;
  const savedRef = useRef(null);

  useEffect(() => {
    setSaved(false);
    (async () => {
      const existing = await loadJSON(key, true, null);
      setRegistro(existing || { fecha: todayISO(), ejercicios: {}, notas: "" });

      // buscar la sesión anterior del MISMO tipo para "última vez".
      // se compara por NOMBRE de sesión (ej. "Piernas" con la "Piernas" anterior,
      // incluso si es una sesión nueva creada para otro bloque), con respaldo por
      // id para registros antiguos que no guardaron el nombre.
      const idx = await loadJSON(`registros-index:${cliente.id}`, true, []);
      const nombreActual = session.nombre.trim().toLowerCase();
      const prev = idx
        .filter((r) => {
          if (r.fecha === todayISO()) return false;
          if (r.sessionNombre) return r.sessionNombre.trim().toLowerCase() === nombreActual;
          return r.sessionId === session.id;
        })
        .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))[0];
      if (prev) {
        const prevData = await loadJSON(prev.key, true, null);
        setUltima(prevData?.ejercicios || {});
        setPrevFecha(prev.fecha);
      } else {
        setUltima({});
        setPrevFecha(null);
      }
    })();
  }, [key, cliente.id, session.id]);

  const persist = useCallback(
    async (next) => {
      setRegistro(next);
      await saveJSON(key, next, true);
      const idx = await loadJSON(`registros-index:${cliente.id}`, true, []);
      if (!idx.find((r) => r.key === key)) {
        await saveJSON(
          `registros-index:${cliente.id}`,
          [...idx, { sessionId: session.id, sessionNombre: session.nombre, fecha: todayISO(), key }],
          true
        );
      }
      setSaved(true);
      clearTimeout(savedRef.current);
      savedRef.current = setTimeout(() => setSaved(false), 1500);
    },
    [key, cliente.id, session.id]
  );

  const addSet = (ex) => {
    const k = exKey(ex.nombre);
    const entry = registro.ejercicios[k] || { nombre: ex.nombre, sets: [] };
    persist({
      ...registro,
      ejercicios: {
        ...registro.ejercicios,
        [k]: { nombre: ex.nombre, sets: [...entry.sets, { carga: "", reps: "", rir: "" }] },
      },
    });
  };

  const updateSet = (ex, i, field, value) => {
    const k = exKey(ex.nombre);
    const entry = registro.ejercicios[k] || { nombre: ex.nombre, sets: [] };
    const sets = [...entry.sets];
    sets[i] = { ...sets[i], [field]: value };
    persist({ ...registro, ejercicios: { ...registro.ejercicios, [k]: { nombre: ex.nombre, sets } } });
  };

  const removeSet = (ex, i) => {
    const k = exKey(ex.nombre);
    const entry = registro.ejercicios[k] || { nombre: ex.nombre, sets: [] };
    const sets = entry.sets.filter((_, idx) => idx !== i);
    persist({ ...registro, ejercicios: { ...registro.ejercicios, [k]: { nombre: ex.nombre, sets } } });
  };

  return (
    <div className="registro">
      <div className="registro-header">
        <span className="muted small">{todayISO()}</span>
        {saved && <span className="saved-tag">guardado</span>}
      </div>
      <div className="muted small compare-note">
        {prevFecha
          ? `comparando progreso con tu "${session.nombre}" del ${prevFecha}`
          : `primera vez que registras "${session.nombre}" — todavía no hay progreso con qué comparar`}
      </div>

      {session.ejercicios.length === 0 && (
        <p className="empty">Esta sesión todavía no tiene ejercicios cargados.</p>
      )}

      {session.ejercicios.map((e) => {
        const entry = registro.ejercicios[exKey(e.nombre)];
        const sets = entry?.sets || [];
        const prevEntry = ultima[exKey(e.nombre)];
        const prevSets = prevEntry?.sets || [];
        const done = sets.length >= e.series;
        return (
          <div key={e.id} className="card ex-card">
            <div className="ex-card-header">
              <div>
                <div className="ex-nombre">{e.nombre}</div>
                <div className="muted small">
                  {e.musculo || "—"} · objetivo {e.series}×{e.reps} @ RIR {e.rir}
                </div>
                {e.link && (
                  <button className="link-btn ex-link-btn" onClick={() => setVideoUrl(e.link)}>
                    ver técnica / video
                  </button>
                )}
              </div>
              <Stamp done={done} />
            </div>

            <Tally count={sets.length} target={e.series} />

            {prevSets.length > 0 && (
              <div className="prev-row muted small">
                última vez:{" "}
                {prevSets
                  .filter((s) => s.carga || s.reps)
                  .map((s, i) => `${s.carga || "-"}kg×${s.reps || "-"}`)
                  .join(" · ") || "sin datos"}
              </div>
            )}

            <div className="sets">
              {sets.map((s, i) => {
                const progreso = compareProgreso(s, prevSets[i]);
                const flagRir = rirFlag(s.rir, e.rir);
                return (
                  <div key={i} className="set-wrap">
                    <div className="set-row">
                      <span className="set-idx">{i + 1}</span>
                      <input
                        className="inp inp-num"
                        type="number"
                        placeholder="kg"
                        value={s.carga}
                        onChange={(ev) => updateSet(e, i, "carga", ev.target.value)}
                      />
                      <input
                        className="inp inp-num"
                        type="number"
                        placeholder="reps"
                        value={s.reps}
                        onChange={(ev) => updateSet(e, i, "reps", ev.target.value)}
                      />
                      <input
                        className="inp inp-num"
                        type="number"
                        placeholder="RIR"
                        value={s.rir}
                        onChange={(ev) => updateSet(e, i, "rir", ev.target.value)}
                      />
                      <button className="link-btn danger" onClick={() => removeSet(e, i)}>
                        x
                      </button>
                    </div>
                    {(progreso === "up" || progreso === "down" || flagRir) && (
                      <div className="set-alerts">
                        {progreso === "up" && <span className="alert-pill alert-up">▲ subió vs última vez</span>}
                        {progreso === "down" && <span className="alert-pill alert-down">▼ bajó vs última vez</span>}
                        {flagRir === "low" && (
                          <span className="alert-pill alert-warn">
                            RIR {s.rir} (objetivo {e.rir}) · se esforzó más de lo indicado
                          </span>
                        )}
                        {flagRir === "high" && (
                          <span className="alert-pill alert-warn">
                            RIR {s.rir} (objetivo {e.rir}) · se esforzó menos de lo indicado
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <Button variant="ghost" onClick={() => addSet(e)}>
                + serie
              </Button>
            </div>
          </div>
        );
      })}

      <Field
        label="Notas de la sesión"
        as="textarea"
        value={registro.notas}
        onChange={(ev) => persist({ ...registro, notas: ev.target.value })}
      />
      <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

function Historial({ cliente, rutina }) {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    (async () => {
      const idx = await loadJSON(`registros-index:${cliente.id}`, true, []);
      setItems(idx.sort((a, b) => (a.fecha < b.fecha ? 1 : -1)));
    })();
  }, [cliente.id]);

  const toggle = async (item) => {
    if (expanded === item.key) {
      setExpanded(null);
      return;
    }
    const data = await loadJSON(item.key, true, null);
    setDetalle(data);
    setExpanded(item.key);
  };

  const nombreSesion = (sid) => rutina.sessions.find((s) => s.id === sid)?.nombre || "Sesión";

  if (items.length === 0) return <p className="empty">Todavía no hay sesiones registradas.</p>;

  return (
    <div className="history">
      {items.map((it) => (
        <div key={it.key} className="card">
          <div className="card-row" onClick={() => toggle(it)}>
            <span>{nombreSesion(it.sessionId)}</span>
            <span className="muted small">{it.fecha}</span>
          </div>
          {expanded === it.key && detalle && (
            <div className="card-body">
              {Object.entries(detalle.ejercicios || {}).map(([k, entry]) => {
                const nombreEx = Array.isArray(entry) ? k : entry.nombre || k;
                const sets = Array.isArray(entry) ? entry : entry.sets || [];
                return (
                  <div key={k} className="muted small" style={{ marginBottom: 6 }}>
                    <strong>{nombreEx}:</strong>{" "}
                    {sets.map((s) => `${s.carga || "-"}kg×${s.reps || "-"} (RIR ${s.rir || "-"})`).join(" · ")}
                  </div>
                );
              })}
              {detalle.notas && <div className="muted small">Notas: {detalle.notas}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Estilos (tokens propios) ---------------- */

const CSS = `
:root {
  --bg: #2A1014;
  --panel: #3A171D;
  --card: #452028;
  --line: #5C2A33;
  --ink: #F5E9EA;
  --muted: #BF9298;
  --accent: #B03A52;
  --ok: #6FA98B;
  --warn: #D9A441;
  --danger: #E0596B;
}
* { box-sizing: border-box; }
.app-root {
  min-height: 100%;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', system-ui, sans-serif;
  padding: 16px;
  max-width: 480px;
  margin: 0 auto;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.brand {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
.brand-accent { color: var(--accent); }
.loading, .empty { color: var(--muted); font-size: 14px; padding: 12px 0; }

.gate { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; }
.gate-sub { color: var(--muted); font-size: 13px; }
.gate-buttons { display: flex; flex-direction: column; gap: 12px; }
.gate-btn {
  background: var(--panel); border: 1px solid var(--line); border-radius: 10px;
  padding: 18px; text-align: left; cursor: pointer; color: var(--ink);
  display: flex; flex-direction: column; gap: 4px;
}
.gate-btn:hover { border-color: var(--accent); }
.gate-btn-title { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; }
.gate-btn-desc { color: var(--muted); font-size: 13px; }

.view { display: flex; flex-direction: column; gap: 20px; }
.panel { display: flex; flex-direction: column; gap: 10px; }
.panel-header-row { display: flex; align-items: center; justify-content: space-between; }
.panel-title { font-family: 'Oswald', sans-serif; font-size: 16px; text-transform: uppercase; letter-spacing: 0.03em; }

.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  background: var(--panel); border: 1px solid var(--line); color: var(--muted);
  padding: 8px 14px; border-radius: 999px; font-size: 13px; cursor: pointer;
}
.chip-active { border-color: var(--accent); color: var(--accent); }

.add-row { display: flex; gap: 8px; }
.add-row .inp { flex: 1; }

.inp {
  background: var(--card); border: 1px solid var(--line); color: var(--ink);
  padding: 10px 12px; border-radius: 8px; font-size: 14px; font-family: inherit;
  width: 100%;
}
.inp:focus { outline: none; border-color: var(--accent); }
.inp-inline { flex: 1; background: transparent; border: none; font-family: 'Oswald', sans-serif; font-size: 15px; padding: 4px 0; }
.inp-num { font-family: 'JetBrains Mono', monospace; text-align: center; }

.btn {
  font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 13px;
  letter-spacing: 0.03em; text-transform: uppercase; border-radius: 8px;
  padding: 10px 16px; cursor: pointer; border: none; white-space: nowrap;
}
.btn-primary { background: var(--accent); color: #FBEEF0; }
.btn-ghost { background: transparent; color: var(--accent); border: 1px solid var(--accent); }

.link-btn { background: none; border: none; color: var(--muted); font-size: 12px; text-decoration: underline; cursor: pointer; padding: 0; }
.link-btn.danger { color: var(--danger); }

.card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 12px; }
.card-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; }
.card-body { margin-top: 10px; display: flex; flex-direction: column; gap: 10px; }

.session-list { display: flex; flex-direction: column; gap: 10px; }
.ex-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--line); }
.ex-nombre { font-weight: 600; font-size: 14px; }
.muted { color: var(--muted); }
.small { font-size: 12px; }

.new-ex { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; padding-top: 10px; border-top: 1px solid var(--line); }
.new-ex-nums { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

.clienta-topbar { display: flex; align-items: baseline; gap: 6px; }
.clienta-nombre { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; margin-right: auto; }

.registro { display: flex; flex-direction: column; gap: 14px; }
.registro-header { display: flex; align-items: center; justify-content: space-between; }
.saved-tag { color: var(--ok); font-size: 12px; }

.ex-card { position: relative; overflow: hidden; }
.ex-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }

.tally-mark {
  width: 14px; height: 18px; border-radius: 2px; border: 1.5px solid var(--line);
  display: inline-block;
}

.prev-row { margin: 6px 0; }

.sets { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
.set-wrap { display: flex; flex-direction: column; gap: 4px; }
.set-row { display: grid; grid-template-columns: 16px 1fr 1fr 1fr 20px; align-items: center; gap: 6px; }
.set-idx { color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 12px; }
.set-alerts { display: flex; flex-wrap: wrap; gap: 6px; padding-left: 22px; }
.alert-pill {
  font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  white-space: nowrap;
}
.alert-up { background: rgba(111,169,139,0.18); color: var(--ok); }
.alert-down { background: rgba(192,83,62,0.18); color: var(--danger); }
.alert-warn { background: rgba(217,164,65,0.18); color: var(--warn); }

.stamp {
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 11px;
  letter-spacing: 0.08em; color: var(--ok); border: 2px solid var(--ok);
  border-radius: 6px; padding: 3px 8px; transform: rotate(-6deg);
  white-space: nowrap;
}

.history { display: flex; flex-direction: column; gap: 8px; }

.pin-box { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pin-display {
  font-family: 'JetBrains Mono', monospace; font-size: 28px; font-weight: 600;
  color: var(--accent); letter-spacing: 0.1em;
}
.error-text { color: var(--danger); font-size: 13px; }

.danger-zone { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line); }
.confirm-row { display: flex; flex-direction: column; gap: 8px; }
.confirm-buttons { display: flex; align-items: center; gap: 14px; }
.btn-danger { border-color: var(--danger) !important; color: var(--danger) !important; }

.picker { position: relative; }
.picker-list {
  position: absolute; z-index: 10; top: calc(100% + 4px); left: 0; right: 0;
  background: var(--card); border: 1px solid var(--line); border-radius: 8px;
  max-height: 220px; overflow-y: auto; box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}
.picker-item {
  display: flex; justify-content: space-between; gap: 8px; width: 100%;
  background: none; border: none; color: var(--ink); text-align: left;
  padding: 8px 10px; cursor: pointer; font-size: 13px;
}
.picker-item:hover { background: var(--panel); }
.ex-link { color: var(--accent); text-decoration: underline; }
.ex-link-btn { color: var(--accent); text-decoration: underline; font-size: 12px; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: flex-end; justify-content: center; z-index: 50;
}
.modal-box {
  background: var(--panel); border: 1px solid var(--line); border-radius: 14px 14px 0 0;
  width: 100%; max-width: 480px; max-height: 85vh; display: flex; flex-direction: column;
  padding: 12px;
}
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.modal-iframe { width: 100%; flex: 1; min-height: 360px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
.modal-fallback { text-align: center; margin-top: 8px; text-decoration: underline; }

textarea.inp { min-height: 60px; resize: vertical; }
`;
