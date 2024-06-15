const TYPES = {
  repositories: {
    ISensorRepository: Symbol('ISensorRepository')
  },
  controllers: {
    HealthController: Symbol('HealthController'),
    SensorController: Symbol('SensorController')
  },
  useCases: {
    RegisterSensor: Symbol('RegisterSensor')
  },
  database: {
    MongoDB: Symbol('MongoDB')
  }
}

export { TYPES }
