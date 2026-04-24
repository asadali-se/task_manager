import os
import sys
from pathlib import Path

# Add the server directory to Python path
server_dir = Path(__file__).parent.parent / 'server'
sys.path.insert(0, str(server_dir))
os.chdir(str(server_dir))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

import django
django.setup()

# Import Django's WSGI handler
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Main handler function for Vercel
def handler(event, context):
    """Handler for Vercel serverless functions"""
    from django.test import RequestFactory
    import json

    # Parse request
    path = event.get('path', '/')
    method = event.get('httpMethod', event.get('method', 'GET'))
    headers = dict(event.get('headers', {}))
    query_params = event.get('queryStringParameters', {}) or {}
    body = event.get('body', '')

    # Create Django request
    factory = RequestFactory()

    # Format headers
    django_headers = {}
    for key, value in headers.items():
        key_upper = key.upper().replace('-', '_')
        django_headers[f'HTTP_{key_upper}'] = value

    # Create request based on method
    if method == 'GET':
        request = factory.get(path, data=query_params, **django_headers)
    elif method == 'POST':
        body_data = json.loads(body) if body else {}
        request = factory.post(path, data=body_data, content_type='application/json', **django_headers)
    elif method == 'PATCH':
        body_data = json.loads(body) if body else {}
        request = factory.patch(path, data=body_data, content_type='application/json', **django_headers)
    elif method == 'DELETE':
        request = factory.delete(path, **django_headers)
    else:
        request = factory.get(path, **django_headers)

    # Get response from Django
    try:
        response = application(request)
        return {
            'statusCode': response.status_code,
            'headers': dict(response.items()),
            'body': response.content.decode('utf-8')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }

