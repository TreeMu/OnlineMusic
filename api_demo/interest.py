## 相关模块导入
import pandas as pd
from py2neo import Graph,Node,Relationship

## 连接图形库，配置neo4j
graph = Graph("http://localhost:7474//browser/",auth = ('neo4j','root'))
# 清空全部数据
graph.delete_all()
# 开启一个新的事务
graph.begin()
## 使用py2neo查询neo4j
## 以下是根据查询条件创建节点（Node）
## 如需创建多个节点，可使用for循环
# 插入结点
query = """
CREATE (:Person {name: '123456', sex:1,age:30,describe:"i am your father"}),
       (:Person {name: 'Jane', sex:0,age: 25,describe:"i am your girlfriend"}),
       (:Person {name: 'Bob', sex:1,age: 40,describe:"i am your son,but i like Jane"}),
       (:Person {name: 'cyh', sex:1,age: 20,describe:"i am Guosen's son"})
"""
graph.run(query)


# 创建结点间的联系
query = """
MATCH (a:Person {name: '123456'}), (b:Person)
WHERE a <> b
CREATE (a)-[:FOLLOWS]->(b)
"""
graph.run(query)


query = "MATCH (p:Person) WHERE p.name <> '123456' RETURN p"

data = []
result = graph.run(query)
records = [record['p'] for record in result]
for record in records:
    data.append({
        'name': record['name'],
        'sex': record['sex'],
        'age': record['age'],
        'describe': record['describe']
    })
print(data)

# Create a pandas DataFrame from the list of dictionaries
df = pd.DataFrame(data)

# Save the DataFrame as a CSV file
df.to_csv('../demo/public/follows.csv', index=False)
