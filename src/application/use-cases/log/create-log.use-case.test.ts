import { LogEntity } from "../../../domain/entities/log.entity";
import { CreateLogUseCase } from "./create-log.use-case";


describe('create-log.use-case.ts', () => {
  const instance = new CreateLogUseCase({
    name: 'Test',
    message: 'test message',
    level: 'medium',
    origin: __filename
  });

  test('Create instance of use case', () => {
    expect(instance).toBeInstanceOf(CreateLogUseCase);
  })

  test('Use case should return appropiate name', () => {
    expect(instance.getName()).toBe('Test');
  })

  test('Execute use case should return LogEntity', () => {
    const log = instance.execute();

    expect(log).toBeInstanceOf(LogEntity);

    expect(log.message).toBeInstanceOf(String);
    expect(log.level).toBeInstanceOf(String);
    expect(log.origin).toBeInstanceOf(String);
    expect(log.createdAt).toBeInstanceOf(Date);
  })
});