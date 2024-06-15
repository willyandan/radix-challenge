const TYPES = {
  repositories: {
    ISensorRepository: Symbol('ISensorRepository')
  },
  routes: {
    HealthRoute: Symbol('HealthRoute'),
    SensorRoute: Symbol('SensorRoute')
  },
  useCases: {
    RegisterSensor: Symbol('RegisterSensor')
  },
  database: {
    MongoDB: Symbol('MongoDB')
  }
}

export { TYPES }
