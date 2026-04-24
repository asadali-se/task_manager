#!/usr/bin/env python
"""Test Django configuration and dependencies"""
import os
import sys
from pathlib import Path

# Add current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

try:
    import django
    print(f"✓ Django {django.VERSION} imported successfully")

    django.setup()
    print("✓ Django setup completed")

    # Test database connection
    from django.db import connection
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✓ Database connection successful")

    # Test models
    from tasks.models import Task
    print(f"✓ Task model imported, {Task.objects.count()} tasks in database")

    # Test URLs
    from django.urls import reverse
    try:
        api_url = reverse('task-list')
        print(f"✓ API URL resolved: {api_url}")
    except Exception as e:
        print(f"✗ URL resolution failed: {e}")

    print("✓ All tests passed!")

except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
