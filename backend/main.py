from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

class Edge(BaseModel):
    source: str
    target: str

class Node(BaseModel):
    id: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    import json
    from collections import defaultdict, deque

    pipeline_data = json.loads(pipeline)
    nodes = pipeline_data["nodes"]
    edges = pipeline_data["edges"]

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    for edge in edges:
        graph[edge['source']].append(edge['target'])
        in_degree[edge['target']] += 1

    zero_in_degree_queue = deque([node['id'] for node in nodes if in_degree[node['id']] == 0])
    visited_nodes = 0

    while zero_in_degree_queue:
        current_node = zero_in_degree_queue.popleft()
        visited_nodes += 1
        for neighbor in graph[current_node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                zero_in_degree_queue.append(neighbor)

    is_dag = visited_nodes == num_nodes

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
