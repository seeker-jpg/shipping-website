// =============================================================================
// PM2 Ecosystem Configuration for MEGA STORAGE
// Production cluster mode with auto-restart and log management
// =============================================================================

module.exports = {
  apps: [
    {
      // Application name
      name: 'corely',
      
      // Start script (Next.js standalone server)
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      
      // Working directory
      cwd: '/var/www/corely',
      
      // Cluster mode for multi-core utilization
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      
      // Auto-restart configuration
      autorestart: true,
      watch: false, // Disable file watching in production
      max_memory_restart: '500M', // Restart if memory exceeds 500MB
      
      // Restart delay and limits
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Exponential backoff restart
      exp_backoff_restart_delay: 100,
      
      // Log configuration
      log_file: '/var/log/pm2/corely-combined.log',
      out_file: '/var/log/pm2/corely-out.log',
      error_file: '/var/log/pm2/corely-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Process metadata
      time: true,
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      
      // Health check (optional)
      // health_check_url: 'http://localhost:3000/api/health',
      // health_check_interval: 30000,
    }
  ],
  
  // Deployment configuration (optional - for pm2 deploy)
  deploy: {
    production: {
      // SSH user
      user: 'deploy',
      
      // Server IP or hostname
      host: ['your-server-ip'],
      
      // SSH port (optional)
      // port: '22',
      
      // Git repository
      ref: 'origin/main',
      repo: 'git@github.com:your-username/corely.git',
      
      // Deployment path on server
      path: '/var/www/corely',
      
      // Commands to run after deployment
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm ci --production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'echo "Setting up production environment..."',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
      }
    }
  }
};
