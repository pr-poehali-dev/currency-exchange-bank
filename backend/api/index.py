import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime


def get_db_connection():
    '''Подключение к базе данных PostgreSQL'''
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    '''API для обменника валют: получение курсов, история транзакций, создание операций'''
    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        
        if method == 'GET' and '/currencies' in path:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('''
                    SELECT code, name, flag, rate_to_rub, updated_at
                    FROM currencies
                    ORDER BY code
                ''')
                currencies = cur.fetchall()
                
                for currency in currencies:
                    if currency['updated_at']:
                        currency['updated_at'] = currency['updated_at'].isoformat()
                    currency['rate_to_rub'] = float(currency['rate_to_rub'])
                
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'currencies': currencies}),
                    'isBase64Encoded': False
                }
        
        elif method == 'GET' and '/transactions' in path:
            query_params = event.get('queryStringParameters') or {}
            limit = int(query_params.get('limit', 50))
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('''
                    SELECT id, from_currency, to_currency, from_amount, to_amount,
                           rate, status, office, created_at
                    FROM transactions
                    ORDER BY created_at DESC
                    LIMIT %s
                ''', (limit,))
                transactions = cur.fetchall()
                
                for tx in transactions:
                    if tx['created_at']:
                        tx['created_at'] = tx['created_at'].isoformat()
                    tx['from_amount'] = float(tx['from_amount'])
                    tx['to_amount'] = float(tx['to_amount'])
                    tx['rate'] = float(tx['rate'])
                
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'transactions': transactions}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST' and '/transactions' in path:
            body = json.loads(event.get('body', '{}'))
            from_currency = body.get('from_currency')
            to_currency = body.get('to_currency')
            from_amount = float(body.get('from_amount', 0))
            to_amount = float(body.get('to_amount', 0))
            rate = float(body.get('rate', 0))
            office = body.get('office', 'Москва, Центр')
            
            if not all([from_currency, to_currency, from_amount, to_amount, rate]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('''
                    INSERT INTO transactions 
                    (from_currency, to_currency, from_amount, to_amount, rate, office, status)
                    VALUES (%s, %s, %s, %s, %s, %s, 'completed')
                    RETURNING id, from_currency, to_currency, from_amount, to_amount, 
                              rate, status, office, created_at
                ''', (from_currency, to_currency, from_amount, to_amount, rate, office))
                
                transaction = cur.fetchone()
                conn.commit()
                
                if transaction['created_at']:
                    transaction['created_at'] = transaction['created_at'].isoformat()
                transaction['from_amount'] = float(transaction['from_amount'])
                transaction['to_amount'] = float(transaction['to_amount'])
                transaction['rate'] = float(transaction['rate'])
                
                conn.close()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'transaction': transaction}),
                    'isBase64Encoded': False
                }
        
        conn.close()
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Endpoint not found'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
