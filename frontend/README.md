# MailSense Frontend

The frontend application for MailSense - an intelligent email classification system built with Angular 19. This modern web interface allows users to classify emails and generate AI-powered responses through an intuitive and responsive design.

## Overview

This Angular application provides a user-friendly interface for the MailSense email classification service. Users can input email content through text input or file upload (PDF, TXT) and receive AI-powered classification results with suggested responses.

## Features

- **Modern Angular 19 Application**: Built with the latest Angular framework
- **Responsive Design**: TailwindCSS for modern, mobile-first styling
- **PrimeNG Components**: Rich UI components for enhanced user experience
- **File Upload Support**: Drag-and-drop file upload for PDF and TXT files
- **Real-time Classification**: Instant email classification and response generation
- **Copy to Clipboard**: Easy copying of generated responses
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during API operations

## Technology Stack

- **Framework**: Angular 19
- **UI Library**: PrimeNG
- **Styling**: TailwindCSS + SCSS
- **HTTP Client**: Angular HttpClient for API communication
- **Build Tool**: Angular CLI
- **Container**: Docker with Nginx

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation & Setup

### Development Environment

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (if needed):
```bash
# Edit src/environments/environment.ts for development
# Edit src/environments/environment.production.ts for production
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200/`

### Docker Deployment

Build and run with Docker:

```bash
# Build the Docker image
docker build -t mailsense-frontend .

# Run the container
docker run -p 80:80 mailsense-frontend
```

Or use Docker Compose from the project root:

```bash
docker-compose up frontend
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── models/              # TypeScript interfaces and models
│   │   │   └── mailsense.models.ts
│   │   ├── services/            # Angular services for API communication
│   │   │   └── mailsense.service.ts
│   │   ├── app.component.html   # Main application template
│   │   ├── app.component.scss   # Component styles
│   │   ├── app.component.ts     # Main application component
│   │   ├── app.config.ts        # Application configuration
│   │   └── app.routes.ts        # Routing configuration
│   ├── environments/            # Environment configurations
│   │   ├── environment.ts       # Development environment
│   │   ├── environment.development.ts
│   │   └── environment.production.ts
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application bootstrap
│   └── styles.scss             # Global styles
├── public/
│   └── favicon.ico             # Application favicon
├── angular.json                # Angular workspace configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # TailwindCSS configuration
├── Dockerfile                 # Docker configuration
└── nginx.conf                 # Nginx configuration for production
```

## Key Components

### MailSenseService
The main service responsible for API communication:
- `classifyEmailContent(content: string)` - Classifies text content
- `classifyEmailFileContent(file: File)` - Classifies uploaded files

### AppComponent
The main application component handling:
- Email content input (text area and file upload)
- API communication and error handling
- Results display and clipboard operations
- Loading states and user feedback

### Models
TypeScript interfaces for type safety:
- `ClassificationResponse` - API response structure

## API Integration

The frontend communicates with the backend through two main endpoints:

### Text Classification
```typescript
classifyEmailContent(content: string): Observable<ClassificationResponse>
```

### File Classification
```typescript
classifyEmailFileContent(file: File): Observable<ClassificationResponse>
```

## Environment Configuration

Configure the API base URL in the environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  API_BASE_URL: 'http://localhost:8000'
};

// src/environments/environment.production.ts
export const environment = {
  production: true,
  API_BASE_URL: 'http://your-backend-url'
};
```

## Available Scripts

```bash
# Development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build

# Run unit tests
npm test
# or
ng test

# Build and watch for changes
npm run watch
# or
ng build --watch --configuration development
```

## Styling

The application uses a combination of:
- **TailwindCSS**: For utility-first styling
- **PrimeNG Theme**: For component theming
- **Custom SCSS**: For component-specific styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Use reactive programming patterns (RxJS)

### Component Structure
- Keep components focused and single-purpose
- Use services for business logic
- Implement proper lifecycle hooks
- Handle loading and error states

## Troubleshooting

### Common Issues

1. **CORS Issues**: Ensure backend CORS configuration allows frontend origin
2. **API Connection**: Verify the API_BASE_URL in environment files
3. **File Upload**: Check file size limits and supported formats
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Debug Commands

```bash
# Clear Angular cache
ng cache clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Verbose build output
ng build --verbose
```

## Contributing

1. Follow Angular coding standards
2. Add proper TypeScript types
3. Include error handling
4. Test thoroughly before submitting
5. Update documentation as needed

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [PrimeNG Documentation](https://primeng.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
