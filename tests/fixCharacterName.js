function fixCharacterName(name) {
      // O nome do personagem vem assim da API: Skyler White 62 episodes, 2008-2013
      // Esta função devolverá apenas Skyler White
      let result = "";
      for (let i = 0; i < name.length; i++) {
        if (name[i] == " " || isNaN(name[i])) {
          result += name[i];
        } else {
          break;
        }
      }
      return result.trim();
    }
  
module.exports = fixCharacterName;