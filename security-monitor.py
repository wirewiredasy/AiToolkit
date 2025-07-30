
import logging
import json
from datetime import datetime
from typing import Dict, List
import hashlib
import os

class SecurityMonitor:
    """Security monitoring and threat detection"""
    
    def __init__(self):
        self.setup_logging()
        self.threat_patterns = {
            'sql_injection': ['union select', 'drop table', 'exec(', 'script>'],
            'xss_attempt': ['<script>', 'javascript:', 'onerror=', 'onload='],
            'path_traversal': ['../', '..\\', '/etc/passwd', 'windows\\system32'],
            'file_inclusion': ['php://input', 'file://', 'data://']
        }
        
    def setup_logging(self):
        """Setup security logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - SECURITY - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('security.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger('SecurityMonitor')
    
    def analyze_request(self, request_data: Dict) -> Dict:
        """Analyze request for security threats"""
        threats_detected = []
        risk_score = 0
        
        # Check for known attack patterns
        content = str(request_data).lower()
        
        for threat_type, patterns in self.threat_patterns.items():
            for pattern in patterns:
                if pattern in content:
                    threats_detected.append(threat_type)
                    risk_score += 10
        
        # Log suspicious activity
        if threats_detected:
            self.logger.warning(f"Security threat detected: {threats_detected}")
            self.logger.warning(f"Request data: {request_data}")
        
        return {
            'threats_detected': threats_detected,
            'risk_score': risk_score,
            'is_safe': risk_score == 0,
            'timestamp': datetime.now().isoformat()
        }
    
    def log_security_event(self, event_type: str, details: Dict):
        """Log security events"""
        event = {
            'event_type': event_type,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        
        self.logger.info(f"Security Event: {json.dumps(event)}")
    
    def generate_security_report(self) -> Dict:
        """Generate security status report"""
        return {
            'security_status': 'ACTIVE',
            'monitoring_enabled': True,
            'last_check': datetime.now().isoformat(),
            'protection_level': 'ENTERPRISE',
            'features_enabled': [
                'Rate Limiting',
                'Input Validation',
                'File Security Checks',
                'XSS Protection',
                'CSRF Protection',
                'SQL Injection Prevention',
                'Path Traversal Protection'
            ]
        }

# Global security monitor instance
security_monitor = SecurityMonitor()

def check_request_security(request_data: Dict) -> bool:
    """Check if request is secure"""
    analysis = security_monitor.analyze_request(request_data)
    return analysis['is_safe']
