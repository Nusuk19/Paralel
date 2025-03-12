import random
import json
import multiprocessing

def partial_sum(points):
    sum_wx = sum(p["x"] * p["w"] for p in points)
    sum_wy = sum(p["y"] * p["w"] for p in points)
    sum_w = sum(p["w"] for p in points)
    return sum_wx, sum_wy, sum_w

def generate_points(num_points, filename):
    points = [
        {"x": random.uniform(-100, 100), "y": random.uniform(-100, 100), "w": random.uniform(1, 10)}
        for _ in range(num_points)
    ]
    with open(filename, "w") as f:
        json.dump(points, f)

def read_points(filename):
    with open(filename, "r") as f:
        return json.load(f)

def chunk_list(data, num_chunks):
    avg = len(data) // num_chunks
    chunks = [data[i * avg: (i + 1) * avg] for i in range(num_chunks)]
    if len(data) % num_chunks:
        chunks[-1].extend(data[num_chunks * avg:])
    return chunks

def compute_center_of_mass_parallel(points, num_processes):
    num_processes = min(multiprocessing.cpu_count() // 2, 4) 
    chunks = chunk_list(points, num_processes)
    
    with multiprocessing.Pool(num_processes) as pool:
        results = pool.map(partial_sum, chunks)
    
    total_wx = sum(r[0] for r in results)
    total_wy = sum(r[1] for r in results)
    total_w = sum(r[2] for r in results)
    
    x_c = total_wx / total_w
    y_c = total_wy / total_w
    
    return x_c, y_c
