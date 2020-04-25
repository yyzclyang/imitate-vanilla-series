import deepClone from '../';

describe('deepClone', () => {
  test('是一个函数', () => {
    expect(deepClone).toBeFunction();
  });
  test('能复制基本类型', () => {
    const sources = [123, '123', true, false, undefined, null, Symbol()];
    sources.map((source) => {
      const result = deepClone(source);
      expect(result).toEqual(deepClone(source));
    });
  });
  describe('deepClone 复制对象', () => {
    test('能够复制对象形式的数字、字符串、布尔值', () => {
      const sources = [
        new Number(123),
        new String('123'),
        new Boolean(true),
        Object(Symbol('symbol'))
      ];
      sources.map((source) => {
        const result = deepClone(source);
        expect(result).toEqual(deepClone(source));
      });
    });
    test('能复制普通对象', () => {
      const source = {
        name: 'jack',
        age: 18,
        child: {
          name: 'tom',
          age: 2
        }
      };
      const result = deepClone(source);
      expect(result).toEqual(source);
    });
    test('能复制数组', () => {
      const source = [1, '2', true, [3, ['4']], { name: 'jack' }];
      const result = deepClone(source);
      expect(result).toEqual(source);
    });
    test('能够复制环', () => {
      const source = { name: 'jack', self: undefined };
      source.self = source;
      const result = deepClone(source);
      expect(result).toEqual(source);
    });
  });
});
