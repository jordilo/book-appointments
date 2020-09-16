import { FullNamePipe } from './full-name.pipe';

describe('FullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullNamePipe();
    expect(pipe).toBeTruthy();
  });
  it('return a correct value', () => {
    const pipe = new FullNamePipe();
    const result = pipe.transform({ id: 1, name: 'Name', lastname: 'Lastname' });
    expect(result).toBe('Name Lastname');
  });
});
