using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Mvc;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        EmployeeDBEntities db = new EmployeeDBEntities();
        public HttpResponseMessage Get()
        {
            //DataTable table = new DataTable();

            //string query = @" SELECT [DepartmentID]
            //                  ,[DepartmentName]
            //                   FROM [EmployeeDB].[dbo].[Departments] ";

            //using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            //using (var cmd = new SqlCommand(query, con))
            //    using(var da =new SqlDataAdapter(cmd))
            //{
            //    cmd.CommandType = CommandType.Text;
            //    da.Fill(table);

            //}
            //return Request.CreateResponse(HttpStatusCode.OK, table);

            return Request.CreateResponse(HttpStatusCode.OK, db.Departments.ToList());
        }

        public string Post(Department department)
        {
            try
            {
                db.Departments.Add(department);
                db.SaveChanges();

                return "Saved Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to Add - " + e.Message;
            }
        }
        public string Put(Department department)
        {
            try
            {
                db.Entry(department).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return "Department update Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to update - " + e.Message;
            }
        }

        public string Delete(long id)
        {
            try
            {
                Department department = db.Departments.Find(id);
                db.Departments.Remove(department);
                db.SaveChanges();

                return "Department Delete Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to Delete - " + e.Message;
            }
        }


    }
}
