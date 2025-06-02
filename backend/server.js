import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Screenshot API endpoint
app.post('/api/screenshot', async (req, res) => {
    let browser;
    
    try {
        console.log('Starting screenshot process...');
        
        // Launch browser with optimized settings
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });
        
        const page = await browser.newPage();
        
        // Set viewport for consistent screenshots
        await page.setViewport({
            width: 800,
            height: 1400,
            deviceScaleFactor: 2
        });
        
        // Navigate to the infographic page
        const baseUrl = req.headers.origin || `http://localhost:${PORT}`;
        await page.goto(baseUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        console.log('Page loaded, waiting for infographic...');
        
        // Wait for the infographic to be fully rendered
        await page.waitForSelector('#infographic', { timeout: 10000 });
        
        // Wait a bit more for all styles to apply
        await page.waitForTimeout(2000);
        
        // Get the infographic element
        const infographicElement = await page.$('#infographic');
        
        if (!infographicElement) {
            throw new Error('Infographic element not found');
        }
        
        console.log('Taking screenshot...');
        
        // Take a screenshot of the infographic
        const screenshot = await infographicElement.screenshot({
            type: 'png',
            omitBackground: false
        });
        
        console.log('Screenshot taken successfully');
        
        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=pinterest-marketing-infographic.png');
        res.setHeader('Content-Length', screenshot.length);
        
        // Send the screenshot
        res.send(screenshot);
        
    } catch (error) {
        console.error('Error taking screenshot:', error);
        res.status(500).json({ 
            error: 'Failed to take screenshot', 
            message: error.message 
        });
    } finally {
        // Always close the browser
        if (browser) {
            await browser.close();
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📸 Screenshot API available at http://localhost:${PORT}/api/screenshot`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});