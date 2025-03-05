// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).



// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  (msg: {type: string, count: number}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-shapes') {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.count;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createEllipse();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
//////////////Test zum definieren Konstanter Formate//////////////
    const formats = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 },
      // Weitere Formate hier hinzufügen
    ];
//////////////TEst zum erstellen der Formate///////////////////////////
function createFormats() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.notify("Bitte wähle ein Frame aus.");
    return;
  }

  const frame = selection[0];
  if (frame.type !== 'FRAME') {
    figma.notify("Bitte wähle ein gültiges Frame aus.");
    return;
  }

  formats.forEach(format => {
    const newFrame = figma.createFrame();
    newFrame.resize(format.width, format.height);
    newFrame.name = format.name;

    // Kopiere die Eigenschaften vom ursprünglichen Frame
    newFrame.x = frame.x + 10; // Versetze den neuen Frame, um Überlappung zu vermeiden
    newFrame.y = frame.y + 10;
    newFrame.fills = JSON.parse(JSON.stringify(frame.fills));
    newFrame.strokes = JSON.parse(JSON.stringify(frame.strokes));
    newFrame.strokeWeight = frame.strokeWeight;
    newFrame.cornerRadius = frame.cornerRadius;

    figma.currentPage.appendChild(newFrame);
  });
}

figma.ui.onmessage = msg => {
  if (msg.type === 'create-shapes') {
    // Logik zum Erstellen von Ellipsen
  } else if (msg.type === 'create-formats') {
    createFormats();
  }
};

//////////////////////////////////////////////////////////////////
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
