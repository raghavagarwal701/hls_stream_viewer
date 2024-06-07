def create_previous_score_strip(strip_image, inning_dtl, score, batsman_dtl, non_striker_dtl, bowler_dtl, temp_dir, eventtime, font, font1):
    score_strip_p = Image.open(strip_image) # PNG images not supported
    draw = ImageDraw.Draw(score_strip_p)
    draw.text((80, 20), inning_dtl, fill="white", font=font)
    draw.text((80, 70), score, fill="white", font=font1)
    draw.text((80, 150), batsman_dtl, fill="white", font=font)
    if 'null' in non_striker_dtl:
        draw.text((600, 150), bowler_dtl, fill="gold", font=font)
    else:
        draw.text((1200, 150), bowler_dtl, fill="gold", font=font)
    if 'null' not in non_striker_dtl:
        draw.text((600, 150), non_striker_dtl, fill="white", font=font)
    strip_img_path_p = f"{temp_dir}/{eventtime}_p.jpg"
    score_strip_p.save(strip_img_path_p)
    return strip_img_path_p