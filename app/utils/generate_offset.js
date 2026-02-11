
const turf = require('@turf/turf');

// Coordinates from PointsRadzynKock.js (Leaflet format: [lat, lng])
const prawaStr = [[51.7955175, 22.6233279], [51.7953934, 22.6230494], [51.795097, 22.6222844], [51.794635, 22.6209685], [51.79454, 22.6206391], [51.7944329, 22.6202413], [51.7941961, 22.6193459], [51.7936523, 22.6165628], [51.7933511, 22.6148201], [51.7931507, 22.6136508], [51.7929932, 22.6127756], [51.7928338, 22.611961], [51.7927078, 22.6113575], [51.7924099, 22.6101998], [51.7920224, 22.6089322], [51.7914751, 22.6074381], [51.7911806, 22.6067324], [51.7908798, 22.6060707], [51.7902738, 22.6048431], [51.7895193, 22.6035336], [51.789268, 22.6031437], [51.7886611, 22.6022809], [51.7881671, 22.6016572], [51.7875607, 22.6009546], [51.7852617, 22.5984929], [51.7843598, 22.5975374], [51.783363, 22.5964739], [51.782234, 22.5953122], [51.7800898, 22.592994], [51.7792264, 22.5921285], [51.7778377, 22.5906877], [51.7770517, 22.5897999], [51.7752742, 22.5879186], [51.7729176, 22.5853528], [51.7718319, 22.5841945], [51.771507, 22.5838638], [51.7680329, 22.58016], [51.7675375, 22.5796269], [51.767482, 22.5795672], [51.7672232, 22.5792888], [51.7649367, 22.5768372], [51.7622352, 22.5739942], [51.7596593, 22.5712617], [51.7582914, 22.5697977], [51.7581948, 22.5696971], [51.7551986, 22.5665791], [51.7538973, 22.5651711], [51.7495771, 22.5606035], [51.742357, 22.5530431], [51.7414305, 22.5520875], [51.7378254, 22.5483096], [51.736733, 22.5472181], [51.7358568, 22.5462127], [51.7322043, 22.5424651], [51.7304485, 22.5406529], [51.7293613, 22.5396163], [51.7266226, 22.5368656], [51.7229242, 22.5330227], [51.7216692, 22.5317103], [51.7213786, 22.5314015], [51.7206726, 22.5306664], [51.7192627, 22.5291138], [51.718769, 22.5285538], [51.7169101, 22.5265784], [51.7162338, 22.5258454], [51.7152877, 22.5249136], [51.7146116, 22.5241331], [51.7127325, 22.5222805], [51.7114133, 22.5209428], [51.7061956, 22.5155826], [51.7060608, 22.5154442], [51.7054126, 22.5147784], [51.6970954, 22.5062119], [51.6954313, 22.5044909], [51.6941924, 22.5031294], [51.6911647, 22.4999616], [51.6827997, 22.4913006], [51.6816496, 22.4900329], [51.6805641, 22.4889025], [51.6797504, 22.4881315], [51.6783312, 22.4866529], [51.67729, 22.4855824], [51.6761359, 22.4843059], [51.6756112, 22.4836469], [51.6750123, 22.4829302], [51.6739902, 22.4815304], [51.6677721, 22.4732481], [51.667401, 22.472759], [51.6654928, 22.4702008]];

const existingLewaStr = [[51.7953392, 22.623386], [51.7952789, 22.6232477], [51.7949142, 22.6223107], [51.794699, 22.6216652], [51.7943887, 22.6206958]]; // Just taking the start to calculate offset

// Convert to Turf format [lng, lat]
const prawaTurf = prawaStr.map(pt => [pt[1], pt[0]]);
const lewaStartTurf = [existingLewaStr[0][1], existingLewaStr[0][0]];

// Calculate parallel offset distance
// Find the nearest point on prawaStr to the start of lewaStr to get the "distance"
const startPointPrawa = turf.point(prawaTurf[0]);
const startPointLewa = turf.point(lewaStartTurf);

// Determine rough distance at the start
const distance = turf.distance(startPointPrawa, startPointLewa, { units: 'kilometers' });
console.log('Calculated offset distance (km):', distance);

// Now generate offset line from prawaStr
// Need to determine direction. Prawa is right side? Lewa is left?
// Let's assume lewa is to the left of prawa.
// "offset" function: positive is left, negative is right (or vice versa depending on line direction)
// The line order in inputs is North to South (approx).
// Let's try positive and negative and see which one matches the start point of existingLewaStr better.

const prawaLine = turf.lineString(prawaTurf);

const offsetLeft = turf.lineOffset(prawaLine, distance, { units: 'kilometers' });
const offsetRight = turf.lineOffset(prawaLine, -distance, { units: 'kilometers' });

const startLeft = offsetLeft.geometry.coordinates[0];
const startRight = offsetRight.geometry.coordinates[0];

const distLeft = turf.distance(turf.point(startLeft), startPointLewa);
const distRight = turf.distance(turf.point(startRight), startPointLewa);

console.log('Distance match positive offset:', distLeft);
console.log('Distance match negative offset:', distRight);

let bestOffsetLine = (distLeft < distRight) ? offsetLeft : offsetRight;

// Check if we need to finetune the distance
// Actually, using the exact calculated distance should be close enough.
// One issue: length of line. Offset line might be slightly different length.
// But the goal is just "more points".
// We can use the generated coordinates.

const fs = require('fs');
const newLewaCoords = bestOffsetLine.geometry.coordinates.map(pt => [pt[1], pt[0]]); // Swap back to [lat, lng]

fs.writeFileSync('app/utils/new_lewa.json', JSON.stringify(newLewaCoords));
console.log('Coordinates written to app/utils/new_lewa.json');
