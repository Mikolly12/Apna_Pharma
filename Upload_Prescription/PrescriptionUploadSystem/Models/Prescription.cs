using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Prescription
{
    [Key]
    public int PrescriptionId { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required, MaxLength(255)]
    public string FilePath { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Status { get; set; } = "Uploaded";

    public DateTime UploadDate { get; set; } = DateTime.Now;

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;
}
