import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfServiceModal = ({ open, onOpenChange }: TermsOfServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="font-display text-3xl font-bold text-foreground">
              Terms of Service
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the NYCN Ireland website (nycn.ie), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. About NYCN Ireland</h2>
              <p className="text-muted-foreground leading-relaxed">
                The National Youth Council of Nigeria, Ireland Chapter (RN:794640) ("NYCN Ireland," "we," "us," or "our") is a registered organization dedicated to empowering Nigerian youth in Ireland through personal development, academic growth, and professional networking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. Use of Website</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.1 Permitted Use</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You may use our website for lawful purposes only. You agree to use the website in a way that:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>Complies with all applicable laws and regulations</li>
                    <li>Respects the rights of others</li>
                    <li>Does not infringe on intellectual property rights</li>
                    <li>Does not transmit harmful or malicious code</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.2 Prohibited Activities</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                    <li>Use the website for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                    <li>Interfere with or disrupt the website or servers</li>
                    <li>Transmit spam, viruses, or other harmful code</li>
                    <li>Impersonate any person or entity</li>
                    <li>Collect or store personal data about other users without consent</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. Membership and Registration</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  When you register to join NYCN Ireland or register for events:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>You must provide accurate, current, and complete information</li>
                  <li>You are responsible for maintaining the confidentiality of your account information</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to refuse or cancel membership at our discretion</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of NYCN Ireland or its content suppliers and is protected by Irish and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. User Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                By submitting content (including messages, comments, or other materials) through our website, you grant NYCN Ireland a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content for the purpose of operating and promoting our organization.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Events and Activities</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  When you register for or attend NYCN Ireland events:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>You agree to comply with event rules and regulations</li>
                  <li>You understand that events may be subject to change or cancellation</li>
                  <li>You are responsible for your own safety and conduct at events</li>
                  <li>We reserve the right to refuse entry or remove attendees who violate event policies</li>
                  <li>Refund policies, if applicable, will be communicated at the time of registration</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The website is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components. We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, NYCN Ireland shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the website or participation in our activities.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">10. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless NYCN Ireland, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your use of the website, violation of these Terms, or violation of any rights of another.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">11. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of the website after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Ireland, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of Ireland.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">13. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-3 p-4 bg-muted rounded-lg">
                <p className="text-foreground font-semibold">NYCN Ireland Chapter (RN:794640)</p>
                <p className="text-muted-foreground">Email: info@nycn.ie</p>
                <p className="text-muted-foreground">Phone: +353 83 487 0106</p>
                <p className="text-muted-foreground">Location: Dublin, Ireland</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;

