
#!/usr/bin/env python3
"""
Health Check for All Microservices
"""
import requests
import time

SERVICES = {
    "Main Gateway": 5000,
    "PDF Service": 8001,
    "Image Service": 8002,
    "Media Service": 8003,
    "Government Service": 8004,
    "Developer Service": 8005
}

def check_service_health():
    print("🏥 Checking Service Health...")
    print("=" * 40)
    
    healthy = 0
    total = len(SERVICES)
    
    for name, port in SERVICES.items():
        try:
            response = requests.get(f"http://localhost:{port}/health", timeout=5)
            if response.status_code == 200:
                print(f"✅ {name} (:{port}) - Healthy")
                healthy += 1
            else:
                print(f"⚠️ {name} (:{port}) - Unhealthy (Status: {response.status_code})")
        except requests.exceptions.ConnectionError:
            print(f"❌ {name} (:{port}) - Not Running")
        except Exception as e:
            print(f"🔴 {name} (:{port}) - Error: {str(e)}")
    
    print(f"\n📊 Overall Health: {healthy}/{total} services healthy")
    
    if healthy == total:
        print("🎉 All services are running perfectly!")
        return True
    elif healthy > 0:
        print("⚠️ Some services are down - processing may fail")
        return False
    else:
        print("💀 No services are running - please start microservices")
        return False

if __name__ == "__main__":
    check_service_health()
