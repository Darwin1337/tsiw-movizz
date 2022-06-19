const extenseWriting = require('./verifyFields'); 
test('Erro na introdução de email', () => {
    expect(extenseWriting("goncalo.gama@","123456789")).toBe(false);
});

test('Erro na introdução de password', () => {
    expect(extenseWriting("goncalo.gama@gmail.com","123")).toBe(false);
});

test('Sucesso', () => {
    expect(extenseWriting("goncalo.gama@gmail.com","123456789")).toBe(true);
});
