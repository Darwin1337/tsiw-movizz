const extenseWriting = require('./extenseWriting'); 
array=["Carro", "Perna", "Prédio"];
array2=["Carro"];
test('Caso tenha um array com mais de 1 elemento', () => {
    expect(extenseWriting(array)).toBe("Carro, Perna and Prédio");
});

test('Caso tenha um array com 1 só elemento', () => {
    expect(extenseWriting(array2)).toBe("Carro");
});

