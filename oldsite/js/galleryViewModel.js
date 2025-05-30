//fields
let projects = [];
let proProjects = [];

export function initVM(){
    console.log("initvm");
    genCards();
    var app = new Vue({
        el: '#app',
        data: {
            galleryCards: projects,
            galleryPro: proProjects
        }
    });
}

function genCards(){
    projects.push(new project("X-iled", "Rogue-lite", "Developer", "./img/xiled_itch_cover.png", [new link("Website", "https://razeki.itch.io/x-iled")], "Traverse through an underground dungeon, slaughtering monsters that impede your path. With devastating power harnessed within your cards, rapidly fire your attacks as you ascend through the levels of the mysterious caves, fighting your way out in order to escape. Unleash your fury: slash, bash, and slam enemies into the ground. Exact vengeance on those that imprisoned you for years."));
    projects.push(new project("Hatmancers", "3D Shooter", "Developer", "./img/hat_thumb.jpg", [new link("GitHub", "https://github.com/nxg9997/Nightcap-Studios-IGME601")], "3D arena wizard dueling game developed in Unity. Pick up hats to gain new magic powers to defeat your opponents."));
    //projects.push(new project("Rocket League Tracker", "Rich Web App", "Developer", "./img/rit_rl_logo.png", [new link("Website", "https://ritcarball.herokuapp.com"), new link("GitHub","https://github.com/nxg9997/CustomRLTracker")], "This is a web application that is used to track the RIT Esports Rocket League players. It utilizes a Node.js backend as well as a MySQL database to store player data."));
    //projects.push(new project("Earth RPG","2D RPG", "Developer", "./img/earthrpglogo.png", [new link("Website", "https://razeki.itch.io/earthrpg")], "EarthRPG is a RPG similar to EarthBound created in Unity. Currently just a proof of concept, but may be developed into a full game at some point."));
    projects.push(new project("No One Left Behind","2D Adventure", "Lead Programmer", "./img/NOLB.png", [new link("Website", "https://razeki.itch.io/no-one-left-behind")], "NOLB places you in a dark forest with the goal of rescuing all of the lost girls in the forest before finding the exit. NOLB won first place at a Game Jam at Ritsumeikan University in Japan."));
    projects.push(new project("JS Quadtree", "Simulation", "Developer", "./img/quad_thumb.jpg", [new link("Website", "https://people.rit.edu/~nxg9997/fun/")], "This is a simulation where you can click to destroy sections of the page. It uses a quadtree to determine solids. In addition, basic particle physics are utilized to make small explosions where the mouse is clicked."));
    projects.push(new project("E.C.H.O.","3D Puzzle", "Producer/Programmer", "./img/echo_thumb.jpg", [new link("Website", "https://razeki.itch.io/echo"), new link("GitHub", "https://github.com/nxg9997/MusicJam")], "E.C.H.O. places you in the shoes of a human test subject who lost their vision during an experiment. Using the power of sound and echolocation, you must travel through a series of dark mazes."));
    //projects.push(new project("Another Hard Game", "2D Platformer", "Developer", "./img/AHG_thumb.jpg", [new link("GitHub", "https://github.com/nxg9997/MetroidVania")], "Another Hard Game is a game based on Super Meat Boy, where the player has to play through many levels of difficult 2D platforming challenges. Currently, the game is still being developed."));
    //projects.push(new project("Detached", "2D Platformer", "Programmer", "./img/detached_thumb.jpg", [new link("GitLab", "https://gitlab.com/jdx963/detachedcode")], "Detached is a 2D platformer where the object of the game is to collect body parts to gain the power to pass through different colored blocks."));
    //projects.push(new project("Humans vs Zombies", "Simulation", "Developer", "./img/hvz.PNG", [new link("GitHub", "https://github.com/nxg9997/HvZ-igme202")], "This is a project created in Unity to demo basic AI behaviours in a 3D environment. The game includes controls that allows you to control various parts of the game, including how many humans and zombies exist in the environment."));
    projects.push(new project("Audio Visualizer", "Simulation", "Developer", "./img/AVlogo.png", [new link("Website", "./AV/visualizer.html")], "This is a web-based audio visualizer built using JS and the Web Audio API"));

    proProjects.push(new project("SMITE", "MOBA", "Gameplay Programmer", "https://www.psu.com/wp/wp-content/uploads/2017/03/smite-1.jpg", [new link("Official Website", "https://smitegame.com/")], "Worked as a Gameplay Programmer for SMITE. Responsible for new God/Character implementation, Game Modes, Items, Backend Server development, and much more! Closely worked with Design and other departments to deliver high-quality releases. Notable features I worked on: Atlas, Lancelot, Martichoras, Charon, Bake Kujira, Bastet (Rework) | Runescape Event | Conquest | April Fools Secret Event | SMITE 2: Thanatos, Amaterasu"));
}

class project{
    constructor(title,genre,role,img,link,description){
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.img = img;
        this.link = link;
        this.role = role;
    }
}

class link{
    constructor(name,url){
        this.name = name;
        this.url = url;
    }
}