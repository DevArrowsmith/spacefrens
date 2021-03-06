const sheet = document.styleSheets[0];
let angleAdjust = 0;

window
  .fetch(`https://spacefrens.herokuapp.com/frensdata`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const numSpaceFrens = data.number;
    const people = data.people;
    const frenSpacingDegrees = 360 / numSpaceFrens;
    const addFren = (axisNumber) => {
      document.getElementById(
        `spacefrens`
      ).innerHTML += `<div class= "space_fren_axis" id="axis${axisNumber}">
          <img id="spacefren" src="assets/images/SpaceFren.png">
        </div>`;
      angleAdjust += frenSpacingDegrees;
      document.getElementById(
        `axis${axisNumber}`
      ).style.transform = `rotate(${angleAdjust}deg)`;
      document.getElementById(
        `axis${axisNumber}`
      ).style.webkitAnimation = `spin${axisNumber} 5s linear infinite`;
      sheet.insertRule(
        `@-webkit-keyframes spin${axisNumber} { 0% { -webkit-transform: rotate(${
          0 + angleAdjust
        }deg);} 100% { -webkit-transform:rotate(${360 + angleAdjust}deg);} }`,
        sheet.cssRules.length
      );
    };
    for (i = 0; i < numSpaceFrens; i++) {
      addFren(i + 1);
    }

    people.forEach(
      (person) =>
        (document.getElementById(
          `infobox`
        ).innerHTML += `<p>${person.name}:<br>${person.craft}</p>`)
    );

    if (numSpaceFrens === 1) {
      document.getElementById(
        `info-relay`
      ).innerHTML = `<p>There is currently ${numSpaceFrens} person in space!</p>`;
    } else if (numSpaceFrens === 0) {
      document.getElementById(
        `info-relay`
      ).innerHTML = `<p>There are currently no people in space.</p>`;
    } else {
      document.getElementById(
        `info-relay`
      ).innerHTML = `<p>There are currently ${numSpaceFrens} people in space!</p>`;
    }
  });
