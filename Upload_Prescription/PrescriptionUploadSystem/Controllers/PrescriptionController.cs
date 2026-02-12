using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class PrescriptionController : Controller
{
    private readonly AppDbContext _db;

    public PrescriptionController(AppDbContext context)
    {
        _db = context;
    }

    // GET
    public IActionResult Upload()
    {
        return View();
    }



    [HttpPost]
    public IActionResult Upload(int userId, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File is required.");

        // ✅ Check if User exists
        var userExists = _db.Users.Any(u => u.UserId == userId);

        if (!userExists)
        {
            ModelState.AddModelError("", "Invalid User ID. User does not exist.");
            return View();
        }

        // File upload
        string uploadPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "Prescriptions");

        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        string fullPath = Path.Combine(uploadPath, fileName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            file.CopyTo(stream);
        }

        // Save Prescription
        var prescription = new Prescription
        {
            UserId = userId,          // ✅ MANUAL USER ID
            FilePath = "/Prescriptions/" + fileName,
            Status = "Uploaded",
            UploadDate = DateTime.Now
        };

        _db.Prescriptions.Add(prescription);
        _db.SaveChanges();

        return RedirectToAction("List");
    }







    //// POST
    //[HttpPost]
    //public IActionResult Upload(IFormFile file)
    //{
    //    if (file != null && file.Length > 0)
    //    {
    //        string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Prescriptions");

    //        if (!Directory.Exists(uploadPath))
    //            Directory.CreateDirectory(uploadPath);

    //        string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
    //        string fullPath = Path.Combine(uploadPath, fileName);

    //        using (var stream = new FileStream(fullPath, FileMode.Create))
    //        {
    //            file.CopyTo(stream);
    //        }




    //        var user = _db.Users.FirstOrDefault();

    //        if (user == null)
    //        {
    //            return BadRequest("No users found. Please create a user first.");
    //        }

    //        Prescription prescription = new Prescription
    //        {
    //            UserId = user.UserId,
    //            FilePath = "/Prescriptions/" + fileName,
    //            Status = "Uploaded",
    //            UploadDate = DateTime.Now
    //        };

    //        _db.Prescriptions.Add(prescription);
    //        _db.SaveChanges();

    //    }

    //    return RedirectToAction("List");
    //}

    public IActionResult List()
{
    var data = _db.Prescriptions
                  .Include(p => p.User)
                  .ToList();

    return View(data);
}

}