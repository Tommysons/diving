/** Approximate schematic observations transcribed from user-supplied dive briefing maps.
 * NOT surveyed bathymetry, GPS coordinates, or live current forecasts.
 * Depths are illustrative ranges in metres; verify with local operators.
 */
export type ReefFeature = 'wall'|'slope'|'overhangs'|'channel'|'thila'|'giri'|'outer-reef'|'coral-blocks'|'sandy-bottom'|'island';
export type ReefSite = {
 slug:string; name:string; mapNumber?:number; boatMinutes?:number;
 minDepthM:number; maxDepthM:number; features:ReefFeature[];
 surfaceIsland?:string; source:'briefing-diagram'; verifiedCoordinates:false;
};
export const maldivesReefSites:ReefSite[] = [
 {slug:'hulhuveli-kandu',name:'Hulhuveli Kandu',mapNumber:21,boatMinutes:55,minDepthM:6,maxDepthM:45,features:['channel','outer-reef','sandy-bottom','island'],surfaceIsland:'Hulhuveli Island',source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'vilu-house-reef',name:'Vilu House Reef',minDepthM:1,maxDepthM:35,features:['wall','overhangs','coral-blocks','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'velavaru-thila',name:'Velavaru Thila',mapNumber:5,boatMinutes:20,minDepthM:8,maxDepthM:40,features:['thila','channel','overhangs','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'ewes-thila',name:"Ewes Thila",mapNumber:28,boatMinutes:35,minDepthM:1,maxDepthM:35,features:['wall','slope','overhangs','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'napoleon-reef',name:'Napoleon Reef',mapNumber:12,boatMinutes:5,minDepthM:5,maxDepthM:35,features:['outer-reef','overhangs','sandy-bottom','island'],surfaceIsland:'Meedhoo Island',source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'magoodhoo-reef',name:'Magoodhoo Reef',mapNumber:15,boatMinutes:40,minDepthM:6,maxDepthM:25,features:['slope','coral-blocks'],surfaceIsland:'Magoodhoo Island',source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'extasy-deep',name:'Extasy Deep',mapNumber:13,boatMinutes:15,minDepthM:3,maxDepthM:35,features:['slope','outer-reef'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'fantasy-corner',name:'Fantasy Corner',minDepthM:3,maxDepthM:30,features:['wall','overhangs','coral-blocks','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'stephan-thila',name:'Stephan Thila',mapNumber:3,boatMinutes:20,minDepthM:5,maxDepthM:35,features:['thila','channel','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'bandhidhoo-giri',name:'Bandhidhoo Giri',mapNumber:19,boatMinutes:30,minDepthM:1,maxDepthM:35,features:['giri','overhangs','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'coral-garden',name:'Coral Garden',mapNumber:25,boatMinutes:20,minDepthM:10,maxDepthM:35,features:['thila','channel','outer-reef','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'octopus-lover',name:'Octopus Lover',mapNumber:17,boatMinutes:20,minDepthM:3,maxDepthM:35,features:['slope','overhangs','outer-reef','thila'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'meedhoo-cave',name:'Meedhoo Cave',mapNumber:32,boatMinutes:5,minDepthM:3,maxDepthM:35,features:['slope','channel','outer-reef','sandy-bottom','island'],surfaceIsland:'Meedhoo Island',source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'wella-giri',name:'Wella Giri',mapNumber:9,boatMinutes:25,minDepthM:1,maxDepthM:35,features:['giri','wall','slope','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'azmee-corner',name:'Azmee Corner',mapNumber:26,boatMinutes:15,minDepthM:3,maxDepthM:35,features:['wall','overhangs','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'kermit-corner',name:'Kermit Corner',mapNumber:7,boatMinutes:30,minDepthM:6,maxDepthM:35,features:['thila','channel','coral-blocks','outer-reef','sandy-bottom','island'],surfaceIsland:'Kandely Fara Island',source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'velavaru-tongue',name:'Velavaru Tongue',mapNumber:11,boatMinutes:20,minDepthM:3,maxDepthM:35,features:['channel','outer-reef','coral-blocks','sandy-bottom'],source:'briefing-diagram',verifiedCoordinates:false},
 {slug:'udhdhoo-reef',name:'Udhdhoo Reef',mapNumber:4,boatMinutes:10,minDepthM:3,maxDepthM:35,features:['island','thila','sandy-bottom'],surfaceIsland:'Udhdhoo Island',source:'briefing-diagram',verifiedCoordinates:false},
];
