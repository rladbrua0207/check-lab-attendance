# import http.server
# from urllib.parse import urlparse, urlsplit, parse_qsl
# import time, requests, json, hashlib, pymysql
# import numpy as np
# import traceback, ssl


# GET=True
# POST=False

# FETCH_ONE=1
# FETCH_ALL=0

# def SQLquery(query,get=GET,FETCH=FETCH_ALL):
#     conn=pymysql.connect(host='0.0.0.0', user='root', password='diplab504', db='commuting_service', charset='utf8')
#     sql=conn.cursor()
#     sql.execute(query)
#     if get:
#         if FETCH==FETCH_ALL:
#             ret=sql.fetchall()
#         else:
#             ret=sql.fetchone()
#         conn.close()
#         return ret
#     else:
#         conn.commit()
#         conn.close()
#         return True


# class Handler(http.server.SimpleHTTPRequestHandler):
#     def do_GET(self):
#         global sql,conn
#         data=urlparse(self.path)
#         path=[d for d in data.path.split("/") if len(d)>0]
#         recv=dict([d.split("=") if "=" in d else [d,"True"] for d in data.query.split("&") if d != ""])
        
#         if path[0] == "hashcode":
            
#             content={"hashcode":hashlib.sha256(str(np.random.random()).encode()).hexdigest()}
            
#             self.do_ok(content)

#         elif path[0] == "status":
#             try:
#                 userid=recv['id']
                
#                 resp=SQLquery("SELECT type FROM commutinglist WHERE id='"+userid+"' ORDER BY timestamp DESC",GET,FETCH_ONE)

#                 if resp is None:
#                     self.do_error(4)
#                 else:
#                     self.do_ok({'status':resp[0]})
#             except:
#                 self.do_error(2)
            
#         elif path[0] == "checkins":
#             try:
#                 userid=recv['id']
                
#                 if len(path)>1:
#                     if path[1] == "today":
#                         st=time.time()
#                         st=time.localtime(st)
                        
#                         _Y=st.tm_year
#                         _M=st.tm_mon
#                         _D=st.tm_mday

#                         st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
#                     elif path[1] == "last":
#                         resp=SQLquery("SELECT timestamp FROM commutinglist WHERE id='"+userid+"' and type='c' ORDER BY timestamp DESC",GET,FETCH_ONE)

#                         if resp is None:
#                             self.do_error(4)
#                         else:
#                             self.do_ok({'timestamp':resp[0]})
#                         return 0
#                     else:
#                         _Y=2000+int(path[1][:2])
#                         _M=int(path[1][2:4])
#                         _D=int(path[1][4:])

#                         st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
#                 else:
#                     st=time.time()
#                     st=time.localtime(st)
                        
#                     _Y=st.tm_year
#                     _M=st.tm_mon
#                     _D=st.tm_mday
                        
#                     st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))

#                 if len(path)>2:
#                     _Y=2000+int(path[2][:2])
#                     _M=int(path[2][2:4])
#                     _D=int(path[2][4:])

#                     et=time.mktime((_Y,_M,_D+1,0,0,-1,0,0,0))
#                 else:
#                     et=time.mktime((_Y,_M,_D+1,0,0,-1,0,0,0))
            
                
#                 resp=SQLquery("SELECT timestamp FROM commutinglist WHERE id='"+userid+"' and type='c' and timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET)
                
#                 if len(resp)==0:
#                     self.do_error(4)
#                 else:
#                     self.do_ok({'timestamp':[r[0] for r in resp]})
                
#             except:
#                 self.do_error(2)
            
#         elif path[0] == "checkouts":
#             try:
#                 userid=recv['id']
                
#                 if len(path)>1:
#                     if path[1] == "today":
#                         st=time.time()
#                         st=time.localtime(st)
                        
#                         _Y=st.tm_year
#                         _M=st.tm_mon
#                         _D=st.tm_mday

#                         st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
#                     elif path[1] == "last":
                        
#                         resp=SQLquery("SELECT timestamp FROM commutinglist WHERE id='"+userid+"' and type='q' ORDER BY timestamp DESC",GET,FETCH_ONE)

#                         if resp is None:
#                             self.do_error(4)
#                         else:
#                             self.do_ok({'timestamp':resp[0]})
#                         return 0
#                     else:
#                         _Y=2000+int(path[1][:2])
#                         _M=int(path[1][2:4])
#                         _D=int(path[1][4:])

#                         st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
#                 else:
#                     st=time.time()
#                     st=time.localtime(st)
                        
#                     _Y=st.tm_year
#                     _M=st.tm_mon
#                     _D=st.tm_mday
                        
#                     st=time.mktime((_Y,_M,_D,0,0,0,0,0,0))

#                 if len(path)>2:
#                     _Y=2000+int(path[2][:2])
#                     _M=int(path[2][2:4])
#                     _D=int(path[2][4:])

#                     et=time.mktime((_Y,_M,_D+1,0,0,-1,0,0,0))
#                 else:
#                     et=time.mktime((_Y,_M,_D+1,0,0,-1,0,0,0))
            
            
#                 resp=SQLquery("SELECT timestamp FROM commutinglist WHERE id='"+userid+"' and type='q' and timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET)
                
#                 if len(resp)==0:
#                     self.do_error(4)
#                 else:
#                     self.do_ok({'timestamp':[r[0] for r in resp]})
                
#             except:
#                 self.do_error(2)
                
#         elif path[0] == "working_hours":
#             try:
#                 date_range=path[1]
#             except:
#                 self.do_error(1)
                
#             try:
#                 userid=recv['id']
                
                
#                 if len(path)>2:
#                         _Ys=2000+int(path[2][:2])
#                         _Ms=int(path[2][2:4])
#                         if len(path[2])>4:
#                             _Ds=int(path[2][4:])
#                         else:
#                             _Ds=1

#                         st=time.mktime((_Ys,_Ms,_Ds,0,0,0,0,0,0))
#                 else:
#                     st=time.time()
#                     st=time.localtime(st)
                        
#                     _Ys=st.tm_year
#                     _Ms=st.tm_mon
#                     _Ds=st.tm_mday
                        
#                     st=time.mktime((_Ys,_Ms,_Ds,0,0,0,0,0,0))

#                 if len(path)>3:
#                     _Ye=2000+int(path[3][:2])
#                     _Me=int(path[3][2:4])
#                     if len(path[2])>4:
#                         _De=int(path[3][4:])
#                     else:
#                         _De=1

#                     et=time.mktime((_Ye,_Me,_De+1,0,0,-1,0,0,0))
#                 else:
#                     _Ye=_Ys
#                     _Me=_Ms
#                     _De=_Ds
                    
#                     et=time.mktime((_Ye,_Me,_De+1,0,0,-1,0,0,0))
                
                
                
#                 if date_range=="day":
#                     if userid==INQKEY:
#                         id_list=SQLquery("SELECT DISTINCT id FROM workinghours WHERE timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET)
                        
#                         content={'hours':{},'namelist':[]}
                        
#                         for uid in id_list:
#                             uname=SQLquery("SELECT name FROM userlist WHERE id='"+uid[0]+"'",GET,FETCH_ONE)
#                             if uname is not None:
#                                 content['namelist'].append(uname[0])
#                                 if 3>=len(path)>1:
#                                     resp=SQLquery("SELECT hours FROM workinghours WHERE id='"+uid[0]+"' and timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET,FETCH_ONE)
#                                     content['hours'][uname[0]]=resp[0]
#                                 elif len(path)>3:
#                                     content['hours'][uname[0]]=[]
#                                     for i in range(int(np.ceil(float(et-st)/86400.))):
#                                         resp=SQLquery("SELECT hours FROM workinghours WHERE id='"+uid[0]+"' and timestamp>="+str((st+i*86400)*1000)+" and timestamp<="+str(np.minimum((st+(i+1)*86400)*1000,et*1000)),GET,FETCH_ONE)
#                                         content['hours'][uname[0]].append(0 if resp is None else resp[0])
#                         self.do_ok(content)
#                     else:
#                         if len(path)==0:
#                             self.do_error(4)
#                         elif 3>=len(path)>1:
#                             resp=SQLquery("SELECT hours FROM workinghours WHERE id='"+userid+"' and timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET,FETCH_ONE)
#                             self.do_ok({'hours':0 if resp is None else resp[0]})
#                         elif len(path)>3:
#                             content=[]
#                             for i in range(int(np.ceil(float(et-st)/86400.))):
#                                 resp=SQLquery("SELECT hours FROM workinghours WHERE id='"+userid+"' and timestamp>="+str((st+i*86400)*1000)+" and timestamp<="+str(np.minimum((st+(i+1)*86400)*1000,et*1000)),GET,FETCH_ONE)
#                                 content.append(0 if resp is None else resp[0])
#                             self.do_ok({'hours':content})
                        
#                 elif date_range=="week":
#                     weekdate=(time.localtime(st).tm_wday+1)%7
#                     st=time.mktime((_Ys,_Ms,_Ds-weekdate,0,0,0,0,0,0))
                    
#                     weekdate=(time.localtime(et).tm_wday+1)%7
#                     et=time.mktime((_Ye,_Me,_De-weekdate+7,0,0,-1,0,0,0))
                    
#                     week_st=st
#                     week_et=week_st+60*60*24*7
                    
#                     hours=[]
                    
#                     while et>week_et:
#                         resp=SQLquery("SELECT SUM(hours) FROM workinghours WHERE id='"+userid+"' and timestamp>="+str(week_st*1000)+" and timestamp<"+str(week_et*1000),GET,FETCH_ONE)
                    
#                         if resp[0] is not None:
#                             hours.append(resp[0])
#                         else:
#                             hours.append(0.0)
                            
#                         week_st=week_et
#                         week_et=week_st+60*60*24*7
                        
#                     resp=SQLquery("SELECT SUM(hours) FROM workinghours WHERE id='"+userid+"' and timestamp>="+str(week_st*1000)+" and timestamp<"+str(et*1000),GET,FETCH_ONE)
                    
#                     if resp[0] is not None:
#                         hours.append(resp[0])
#                     else:
#                         hours.append(0.0)
                    
#                     if 3>=len(path)>1:
#                         self.do_ok({'hours':hours[0]})
#                     elif len(path)>3:
#                         self.do_ok({'hours':hours})
                    
                    
#                 elif date_range=="month":
#                     cnt=(_Ye-_Ys)*12+(_Me-_Ms)+1
                    
#                     hours=[]
                    
#                     for n in range(cnt):
#                         st=time.mktime((_Ys,_Ms+n,1,0,0,0,0,0,0))
#                         et=time.mktime((_Ys,_Ms+n+1,0,0,-1,0,0,0,0))
                        
#                         resp=SQLquery("SELECT SUM(hours) FROM workinghours WHERE id='"+userid+"' and timestamp>="+str(st*1000)+" and timestamp<="+str(et*1000),GET,FETCH_ONE)
                    
#                         if resp[0] is not None:
#                             hours.append(resp[0])
#                         else:
#                             hours.append(0.0)
                    
#                     if 3>=len(path)>1:
#                         self.do_ok({'hours':hours[0]})
#                     elif len(path)>3:
#                         self.do_ok({'hours':hours})
                
                
#             except Exception as e:
#                 traceback.print_exc()
#                 self.do_error(2)
#         else:
#             self.do_error(1)
            
#     def do_POST(self):
#         data=urlparse(self.path)
#         path=[d for d in data.path.split("/") if len(d)>0]
#         global sql,conn
#         if path[0] == "checkin":
#             try:
#                 content_length=int(self.headers['Content-Length'])
#                 recv=json.loads(self.rfile.read(content_length).decode())
                
#                 userid=recv['id']
                
#                 resp=SQLquery("SELECT * FROM commutinglist WHERE id='"+userid+"' ORDER BY timestamp DESC",GET,FETCH_ONE)
                
#                 if resp is not None and resp[1]=='c':
#                     self.do_error(5)
#                 else:
#                     SQLquery("INSERT INTO commutinglist VALUES('"+userid+"','c',"+str(time.time()*1000)+")",POST)
                    
#                     self.do_ok()
                
#             except Exception as e:
#                 print(e)
#                 self.do_error(2)
#         elif path[0] == "checkout":
#             try:
#                 content_length=int(self.headers['Content-Length'])
#                 recv=json.loads(self.rfile.read(content_length).decode())
                
#                 userid=recv['id']
                
#                 resp=SQLquery("SELECT * FROM commutinglist WHERE id='"+userid+"' ORDER BY timestamp DESC",GET,FETCH_ONE)
                
#                 if resp is None or resp[1]=='q':
#                     self.do_error(6)
#                 else:
#                     _time=time.time()
#                     SQLquery("INSERT INTO commutinglist VALUES('"+userid+"','q',"+str(_time*1000)+")",POST)
                    
#                     workhour=_time-resp[2]/1000
#                     workhour=time.gmtime(workhour)
#                     workhour=(workhour.tm_mday-1)*24+workhour.tm_hour+workhour.tm_min/60.
                    
#                     timelog=time.localtime(_time)
#                     _Y=timelog.tm_year
#                     _M=timelog.tm_mon
#                     _D=timelog.tm_mday
                    
#                     ptimelog=time.localtime(resp[2]/1000)
#                     _pY=ptimelog.tm_year
#                     _pM=ptimelog.tm_mon
#                     _pD=ptimelog.tm_mday

#                     workday=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
                    
#                     if resp[2]/1000>=workday:
#                         resp=SQLquery("SELECT * FROM workinghours WHERE id='"+userid+"' and timestamp="+str(workday*1000),GET,FETCH_ONE)

#                         if resp is not None:
#                             workhour_last=resp[2]
#                             SQLquery("UPDATE workinghours SET hours='"+str(workhour_last+workhour)+"' WHERE id='"+userid+"' and timestamp="+str(workday*1000),POST)
#                         else:
#                             SQLquery("INSERT INTO workinghours VALUES('"+userid+"',"+str(workday*1000)+","+str(workhour)+")",POST)
#                     else:
#                         workhour_0=workday-resp[2]/1000
#                         workhour_0=workhour_0/60/60
                        
#                         workday_0=time.mktime((_pY,_pM,_pD,0,0,0,0,0,0))
                        
#                         i=1
#                         while workhour_0>24:
#                             workday_=time.mktime((_pY,_pM,_pD+i,0,0,0,0,0,0))
#                             workhour_=24.
                            
#                             resp=len(SQLquery("SELECT * FROM workinghours WHERE id='"+userid+"' and timestamp="+str(workday_*1000),GET))

#                             if resp>0:
#                                 SQLquery("UPDATE workinghours SET hours='"+str(workhour_)+"' WHERE id='"+userid+"' and timestamp="+str(workday_*1000),POST)
#                             else:
#                                 SQLquery("INSERT INTO workinghours VALUES('"+userid+"',"+str(workday_*1000)+","+str(workhour_)+")",POST)
                                
#                             workhour_0-=24
#                             i+=1
                        
                        
#                         resp=SQLquery("SELECT * FROM workinghours WHERE id='"+userid+"' and timestamp="+str(workday_0*1000),GET,FETCH_ONE)

#                         if resp is not None:
#                             workhour_last=resp[2]
#                             SQLquery("UPDATE workinghours SET hours='"+str(workhour_last+workhour_0)+"' WHERE id='"+userid+"' and timestamp="+str(workday_0*1000),POST)
#                         else:
#                             SQLquery("INSERT INTO workinghours VALUES('"+userid+"',"+str(workday_0*1000)+","+str(workhour_0)+")",POST)
                            
                            
                    
#                         workhour_1=_time-workday
#                         workhour_1=time.gmtime(workhour_1)
#                         workhour_1=(workhour_1.tm_mday-1)*24+workhour_1.tm_hour+workhour_1.tm_min/60.
                        
#                         workday_1=time.mktime((_Y,_M,_D,0,0,0,0,0,0))
                            
                            
#                         resp=SQLquery("SELECT * FROM workinghours WHERE id='"+userid+"' and timestamp="+str(workday_1),GET,FETCH_ONE)

#                         if resp is not None:
#                             workhour_last=resp[2]
#                             SQLquery("UPDATE workinghours SET hours='"+str(workhour_last+workhour_1)+"' WHERE id='"+userid+"' and timestamp="+str(workday_1*1000),POST)
#                         else:
#                             SQLquery("INSERT INTO workinghours VALUES('"+userid+"',"+str(workday_1*1000)+","+str(workhour_1)+")",POST)
                    
#                     self.do_ok()
                
#             except Exception as e:
#                 print(e)
#                 self.do_error(2)
#         else:
#             self.do_error(1)
        
#     def do_PUT(self):
#         data=urlparse(self.path)
#         path=[d for d in data.path.split("/") if len(d)>0]
#         global sql,conn
#         if path[0] == "user":
#             try:
#                 content_length=int(self.headers['Content-Length'])
#                 recv=json.loads(self.rfile.read(content_length).decode())
           
#                 userid=recv['id']
#                 name=recv['name']
                
#                 resp=len(SQLquery("SELECT * FROM userlist WHERE id='"+userid+"'",GET))
                
#                 if resp>0:
#                     self.do_error(2,"Already exist ID.")
#                 else:
#                     resp=len(SQLquery("SELECT * FROM userlist WHERE name='"+name+"'",GET))

#                     if resp>0:
#                         self.do_error(2,"Already exist name.")
#                     else:
#                         SQLquery("INSERT INTO userlist VALUES('"+userid+"','"+name+"')",POST)
                    
#                         self.do_ok()
                
#             except:
#                 self.do_error(2)
#         else:
#             self.do_error(1)
        
#     def do_DELETE(self):
#         data=urlparse(self.path)
#         path=[d for d in data.path.split("/") if len(d)>0]
#         global sql,conn
#         if path[0] == "user":
            
#             try:
#                 content_length=int(self.headers['Content-Length'])
#                 recv=json.loads(self.rfile.read(content_length).decode())

#                 userid=recv['id']
#                 name=recv['name']
#                 auth=recv['authorization']
                
#                 if auth!=AUTHKEY:
#                     self.do_error(2, "Not available an authorization key.")
#                 else:
#                     resp=len(SQLquery("SELECT * FROM userlist WHERE id='"+userid+"' and name='"+name+"'",GET))

#                     if resp==0:
#                         self.do_error(4)
#                     else:
#                         SQLquery("DELETE FROM userlist WHERE id='"+userid+"' and name='"+name+"'",POST)

#                         self.do_ok()
                
#             except:
#                 self.do_error(2)
#         else:
#             self.do_error(1)
        
#     def do_PATCH(self):
#         data=urlparse(self.path)
#         path=[d for d in data.path.split("/") if len(d)>0]
#         global sql,conn
#         if path[0] == "user":
#             try:
#                 content_length=int(self.headers['Content-Length'])
#                 recv=json.loads(self.rfile.read(content_length).decode())

#                 userid=recv['id']
#                 name=recv['name']
#                 auth=recv['authorization']
                
#                 if auth!=AUTHKEY:
#                     self.do_error(2, "Not available an authorization key.")
#                 else:
                
#                     resp=len(SQLquery("SELECT * FROM userlist WHERE name='"+name+"'",GET))

#                     if resp==0:
#                         self.do_error(4)
#                     else:
#                         SQLquery("UPDATE userlist SET id='"+userid+"' WHERE name='"+name+"'",POST)

#                         self.do_ok()
                
#             except:
#                 self.do_error(2)
#         else:
#             self.do_error(1)
        
        
#     def do_OPTIONS(self):
#         self.do_ok()
        
        
        
#     def do_error(self,n,msg=None):
#         if n==1:
#             if msg is None:
#                 msg="Isn't expected URI."
#             content=json.dumps({'errcode':1,'err':msg})
#             self.send_response(404)
#         elif n==2:
#             if msg is None:
#                 msg="Isn't expected content."
#             content=json.dumps({'errcode':2,'err':msg})
#             self.send_response(400)
#         elif n==3:
#             if msg is None:
#                 msg="Doesn't exist id."
#             content=json.dumps({'errcode':3,'err':msg})
#             self.send_response(400)
#         elif n==4:
#             if msg is None:
#                 msg="Doesn't exist."
#             content=json.dumps({'errcode':4,'err':msg})
#             self.send_response(404)
#         elif n==5:
#             if msg is None:
#                 msg="Already checked-in."
#             content=json.dumps({'errcode':5,'err':msg})
#             self.send_response(400)
#         elif n==6:
#             if msg is None:
#                 msg="Already checked-out."
#             content=json.dumps({'errcode':6,'err':msg})
#             self.send_response(400)
        
#         self.send_header('Access-Control-Allow-Origin', '*')
#         self.send_header('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
#         self.send_header('Access-Control-Allow-Headers', '*')
#         self.end_headers()
#         self.wfile.write(content.encode("UTF-8"))
    
#     def do_ok(self,content=dict()):
#         content['errcode']=0
#         content['err']="ok"
#         self.send_response(200)
#         self.send_header('Content-Type', 'application/json; charset=utf-8')
#         self.send_header('Access-Control-Allow-Origin', '*')
#         self.send_header('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
#         self.send_header('Access-Control-Allow-Headers', '*')
#         self.end_headers()
#         self.wfile.write(json.dumps(content).encode("UTF-8"))
        
# server = http.server.HTTPServer(('0.0.0.0',55555),Handler)
# server.socket = ssl.wrap_socket(server.socket, server_side=True, certfile='snakeoil.pem', keyfile='snakeoil-key.pem', ssl_version=ssl.PROTOCOL_TLS)

# try:
#     server.serve_forever()
# except:
#     server.server_close()