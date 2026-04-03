/**
 * MEMORY USAGE CHECK
 * Monitors the system memory consumption (Heap and RSS).
 * Prevents the application from running out of memory in production.
 */

const HEAP_THRESHOLD = 90; // Default: 90% of heap used
const RSS_THRESHOLD = 500;   // Default: 500 MB RSS

interface MemoryInfo {
    heapUsedMB: number;
    heapTotalMB: number;
    heapPercent: string;
    rssMB: number;
    externalMB: number;
}

/**
 * Calculates current memory usage and checks against thresholds.
 * Throws an Error if usage exceeds defined limits.
 */
export const checkMemory = async (): Promise<MemoryInfo> => {
    const { heapUsed, heapTotal, rss, external } = process.memoryUsage();

    const heapUsedMB = parseFloat((heapUsed / 1024 / 1024).toFixed(1));
    const heapTotalMB = parseFloat((heapTotal / 1024 / 1024).toFixed(1));
    const rssMB = parseFloat((rss / 1024 / 1024).toFixed(1));
    const externalMB = parseFloat((external / 1024 / 1024).toFixed(1));
    const heapPercentNum = (heapUsed / heapTotal) * 100;
    const heapPercent = heapPercentNum.toFixed(1) + '%';

    if (heapPercentNum > HEAP_THRESHOLD) {
        throw new Error(`Heap usage is too high: ${heapPercent} (limit: ${HEAP_THRESHOLD}%)`);
    }

    if (rssMB > RSS_THRESHOLD) {
        throw new Error(`RSS is too high: ${rssMB} MB (limit: ${RSS_THRESHOLD} MB)`);
    }

    return {
        heapUsedMB,
        heapTotalMB,
        heapPercent,
        rssMB,
        externalMB,
    };
};