// Create a performance observer
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        // Log Core Web Vitals
        if (entry.name === 'LCP') {
            console.log('LCP:', entry.startTime);
        }
        if (entry.name === 'FID') {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.name === 'CLS') {
            console.log('CLS:', entry.value);
        }
    });
});

// Observe performance metrics
observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] }); 