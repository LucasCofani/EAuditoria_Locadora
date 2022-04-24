using Locadora_EAuditoria.Data;
using Locadora_EAuditoria.Models;
using Locadora_EAuditoria.Service;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IService<LocacaoDTO>, LocacaoService>();
builder.Services.AddScoped<IService<Filme>, FilmeService>();
builder.Services.AddScoped<IService<Cliente>, ClienteService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();

builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
var connstring = builder.Configuration.GetConnectionString("default");
var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));

builder.Services.AddDbContext<DefaultDbContext>(opt =>
{
    opt.UseMySql(connstring,serverVersion);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(
    p => p
        .SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
);
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    // Create database as soon as the app starts
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<DefaultDbContext>();
        db.Database.Migrate();
        Console.WriteLine("Ensure tables are created.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error on creating tables: {ex.Message}");
    }
}
app.Run();
