const fixCharacterName = require('./fixCharacterName'); 
test('Transformar o nome do personagem que vem da API', () => {
    expect(fixCharacterName("Skyler White 62 episodes, 2008-2013")).toBe("Skyler White");
});

