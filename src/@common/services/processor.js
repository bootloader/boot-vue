let DataProcessor = {};

function registerDataProcessor(name, processor) {
  DataProcessor[name] = processor;
}

export { DataProcessor, registerDataProcessor };
