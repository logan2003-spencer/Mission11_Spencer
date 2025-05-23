using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Mission11_Spencer.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));


builder.Services.AddCors(options => 
options.AddPolicy("AllowReactAppBlah", 
policy => {
    policy.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("AllowReactAppBlah");

app.UseAuthorization();

app.MapControllers();

app.Run();
