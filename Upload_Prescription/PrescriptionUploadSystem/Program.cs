using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// MVC
builder.Services.AddControllersWithViews();

// ✅ MySQL Configuration
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        "Server=localhost;Port=3306;Database=apnapharma;User=root;Password=manager",
        new MySqlServerVersion(new Version(8, 0, 36))
    )
);

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Prescription}/{action=Upload}/{id?}");

app.Run();
