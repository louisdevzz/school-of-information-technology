import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      success: true,
      message: 'Welcome to SIT Backend API',
      version: '1.0.0',
      description: 'Backend API for Student Information System with OpenAI Translation',
      endpoints: {
        educationLevels: {
          base: '/api/education-levels',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Manage education levels (undergraduate, postgraduate)',
        },
        majors: {
          base: '/api/majors',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Manage majors (Computer Science, Data Science, AI)',
        },
        programs: {
          base: '/api/programs',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Manage academic programs',
        },
        courses: {
          base: '/api/courses',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Manage courses and subjects',
        },
        programStructures: {
          base: '/api/program-structures',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          description: 'Manage program structures and knowledge blocks',
        }
      }
    };
  }

  getHealth() {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
