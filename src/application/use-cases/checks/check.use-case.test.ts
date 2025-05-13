import { LogEntity } from "../../../domain/entities/log.entity.ts";
import { CheckUseCase } from "./check.use-case.ts";

describe('CheckUseCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };

  const mockOnSuccess = jest.fn();

  const mockOnError = jest.fn();

  const checkUseCase = new CheckUseCase({
    name: 'Test',
    onError: mockOnError,
    onSuccess: mockOnSuccess,
    logRepository: [mockRepository]
  });

  test('should create an instance of CheckUseCase', () => {
    expect(checkUseCase).toBeInstanceOf(CheckUseCase);
  });


  test('should geat name of an instance of CheckUseCase', () => {
    expect(checkUseCase.getName()).toBe('Test');
  });


  test('should execute check on url provided', async () => {
    const isWorking = await checkUseCase.execute('https://google.com');

    expect(isWorking).toBe(true);
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnError).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should fail execute check on false url provided', async () => {
    const isWorking = await checkUseCase.execute('https://anvkjnkvajnbnnujwvfgygv.com');

    expect(isWorking).toBe(false);
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

})