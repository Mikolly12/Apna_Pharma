using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required, MaxLength(150)]
    public string Email { get; set; }

    [Required, MaxLength(50)]
    public string Role { get; set; }
}
