// This plugin will open a window to prompt the user to create rectangles or formats.

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 200 }); // Stelle sicher, dass die UI korrekt angezeigt wird

// Define constant formats
const formats = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
  // Weitere Formate hier hinzufügen
];

// Function to create frames (artboards) with fixed sizes
function createFixedFrames() {
  console.log("Erstelle vordefinierte Arbeitsflächen");
  const nodes: SceneNode[] = [];
  formats.forEach((format, index) => {
    const frame = figma.createFrame();
    frame.resize(format.width, format.height);
    frame.name = format.name;
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    frame.x = index * (format.width + 20); // Abstand zwischen Arbeitsflächen
    figma.currentPage.appendChild(frame);
    nodes.push(frame);
    console.log(`Arbeitsfläche ${format.name} erstellt`);
  });

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
  figma.notify("Vordefinierte Arbeitsflächen erstellt!");
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg: { type: string }) => {
  console.log("Nachricht empfangen im Plugin:", msg);

  if (msg.type === 'create-shapes') {
    console.log("Starte createFixedFrames für 'create-shapes'");
    createFixedFrames();
  } else if (msg.type === 'create-formats') {
    console.log("Starte createFixedFrames für 'create-formats'");
    createFixedFrames(); // Use the same function for now
  } else {
    console.log("Unbekannter Nachrichtentyp:", msg.type);
  }

  figma.closePlugin();
};

