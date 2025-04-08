// Define a polyfill for crypto.getRandomValues
const cryptoPolyfill = {
  getRandomValues: function(arr: Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array): typeof arr {
    // Simple implementation that doesn't require Node.js crypto
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  }
};

// Apply polyfill to global
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = cryptoPolyfill;
} else if (typeof globalThis.crypto.getRandomValues !== 'function') {
  (globalThis.crypto as any).getRandomValues = cryptoPolyfill.getRandomValues;
}

// Handle browser environment
if (typeof window !== 'undefined') {
  if (typeof (window as any).crypto === 'undefined') {
    (window as any).crypto = cryptoPolyfill;
  } else if (typeof (window as any).crypto.getRandomValues !== 'function') {
    (window as any).crypto.getRandomValues = cryptoPolyfill.getRandomValues;
  }
}

export { }; 