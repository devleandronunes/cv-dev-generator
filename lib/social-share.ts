export function shareOnSocialMedia(platform: string, text: string) {
  const encodedText = encodeURIComponent(text)
  const currentUrl = encodeURIComponent(window.location.href)

  let shareUrl = ""

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedText}%20${currentUrl}`
      break
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
      break
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${encodedText}`
      break
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${currentUrl}`
      break
    default:
      return
  }

  window.open(shareUrl, "_blank", "width=600,height=400")
}
