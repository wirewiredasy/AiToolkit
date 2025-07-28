
#!/usr/bin/env python3
"""
Suntyn AI Requirements Auto-Updater
Automatically updates Python dependencies and requirements
"""

import subprocess
import sys
import os
from datetime import datetime

def run_command(command, description):
    """Run shell command with error handling"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully")
            return True
        else:
            print(f"❌ {description} failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error during {description}: {e}")
        return False

def update_requirements():
    """Update Python requirements automatically"""
    print("🐍 Suntyn AI Python Requirements Auto-Updater")
    print("=" * 50)
    
    # Update pip first
    run_command("pip install --upgrade pip", "Updating pip")
    
    # Generate current requirements
    run_command("pip freeze > current_requirements.txt", "Generating current requirements")
    
    # Install/update requirements
    if os.path.exists("requirements.txt"):
        run_command("pip install -r requirements.txt --upgrade", "Updating requirements")
    
    # Install additional useful packages
    additional_packages = [
        "python-dotenv",
        "pydantic-settings", 
        "aiofiles",
        "python-magic"
    ]
    
    for package in additional_packages:
        run_command(f"pip install {package} --upgrade", f"Installing {package}")
    
    # Generate updated requirements
    run_command("pip freeze > updated_requirements.txt", "Generating updated requirements")
    
    print("✅ Requirements update completed!")
    print(f"📅 Updated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    update_requirements()
