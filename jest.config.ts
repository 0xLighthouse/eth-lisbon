import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    clearMocks: true,
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true, diagnostics: true }]
    },
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: ['<rootDir>/packages/'],
    testPathIgnorePatterns: ['<rootDir>/.*/(mock.*)', '<rootDir>/.*/(helper.*)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/packages/signaturi/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default config
