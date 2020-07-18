using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
            EmployeeDBEntities db = new EmployeeDBEntities();
        public HttpResponseMessage Get()
        { 
            return Request.CreateResponse(HttpStatusCode.OK, db.Employees.ToList());
        }


        public string Post(Employee employee)
        {
            try
            {
                db.Employees.Add(employee);
                db.SaveChanges();

                return "Employee Saved Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to Add - " + e.Message;
            }
        }
        public string Put(Employee employee)
        {
            try
            {
                db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return "Employee update Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to Add - " + e.Message;
            }
        }
        public string Delete(long id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                db.Employees.Remove(employee);
                db.SaveChanges();

                return "Employee Delete Successfully!";
            }
            catch (Exception e)
            {

                return "Failed to Delete - " + e.Message;
            }
        }



    }
}
