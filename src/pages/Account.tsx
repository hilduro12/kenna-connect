import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Bell,
  CreditCard,
  Shield,
  LogOut,
  Trash2,
  HelpCircle,
  BadgeCheck,
  BookOpen,
  Clock,
  Eye,
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

/* ─── Section wrapper ─── */
const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
    <div className="mb-5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    {children}
  </div>
);

/* ─── Toggle row ─── */
const ToggleRow = ({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
};

/* ─── Verification row ─── */
const VerificationRow = ({
  icon: Icon,
  label,
  status,
  statusColor,
  action,
}: {
  icon: React.ElementType;
  label: string;
  status: string;
  statusColor: string;
  action?: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className={`text-xs font-medium ${statusColor}`}>{status}</span>
      </div>
    </div>
    {action && (
      <Button size="sm" variant="outline" className="text-xs shrink-0">
        {action}
      </Button>
    )}
  </div>
);

const Account = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isTutor = user?.role === "tutor";

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your profile has been updated.",
    });
  };

  /* Sample data */
  const profileData = isTutor
    ? {
        name: user?.name || "Bjarki Þórsson",
        email: user?.email || "bjarki@kenna.is",
        phone: "+354 612 3456",
        location: "Reykjavík",
        tagline: "Experienced English teacher — essay writing & exam prep",
        subjects: ["English", "Danish"],
        rate: "6.500",
        avatar: "BÞ",
      }
    : {
        name: user?.name || "Guðrún Helgadóttir",
        email: user?.email || "gudrun@example.is",
        phone: "+354 845 6789",
        location: "Kópavogur",
        childName: "Katrín",
        schoolLevel: "9th grade",
        preferredSubjects: ["Mathematics", "Physics"],
        avatar: "GH",
      };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container max-w-3xl py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Account Settings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your profile, preferences, and account.
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 w-full justify-start bg-muted/30 p-1 h-auto flex-wrap">
              <TabsTrigger value="profile" className="gap-1.5 text-xs px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <User className="h-3.5 w-3.5" /> Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1.5 text-xs px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Bell className="h-3.5 w-3.5" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-1.5 text-xs px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <CreditCard className="h-3.5 w-3.5" /> {isTutor ? "Profile Status" : "Subscription"}
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5 text-xs px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Shield className="h-3.5 w-3.5" /> Security
              </TabsTrigger>
            </TabsList>

            {/* ═══════════════ PROFILE TAB ═══════════════ */}
            <TabsContent value="profile" className="space-y-5">
              <Section title="Profile information" description="How you appear on Kenna.">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                      {profileData.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Camera className="h-3.5 w-3.5" /> Change photo
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, max 2 MB</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-foreground">Full name</label>
                    <Input defaultValue={profileData.name} className="mt-1.5 bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Email</label>
                    <Input defaultValue={profileData.email} className="mt-1.5 bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Phone</label>
                    <Input defaultValue={profileData.phone} className="mt-1.5 bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Location</label>
                    <Input defaultValue={profileData.location} className="mt-1.5 bg-background" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-foreground">Role</label>
                  <div className="mt-1.5">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {user?.role || "parent"}
                    </Badge>
                  </div>
                </div>
              </Section>

              {/* Role-specific section */}
              {isTutor ? (
                <Section title="Teaching profile" description="Information visible to students and parents.">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-foreground">Headline</label>
                      <Input
                        defaultValue={(profileData as any).tagline}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Subjects</label>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {(profileData as any).subjects?.map((s: string) => (
                          <Badge key={s} variant="outline" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                        <Button size="sm" variant="ghost" className="h-6 text-xs text-muted-foreground">
                          + Add
                        </Button>
                      </div>
                    </div>
                    <div className="sm:w-1/2">
                      <label className="text-xs font-medium text-foreground">Hourly rate (ISK)</label>
                      <Input
                        defaultValue={(profileData as any).rate}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked />
                      <div>
                        <p className="text-sm font-medium text-foreground">Available for online lessons</p>
                        <p className="text-xs text-muted-foreground">Students can book online lessons with you</p>
                      </div>
                    </div>
                  </div>
                </Section>
              ) : (
                <Section title="Learning preferences" description="Help us match you with the right teachers.">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-foreground">Student name</label>
                      <Input
                        defaultValue={(profileData as any).childName}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">School level</label>
                      <Input
                        defaultValue={(profileData as any).schoolLevel}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-xs font-medium text-foreground">Preferred subjects</label>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {(profileData as any).preferredSubjects?.map((s: string) => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                      <Button size="sm" variant="ghost" className="h-6 text-xs text-muted-foreground">
                        + Add
                      </Button>
                    </div>
                  </div>
                </Section>
              )}

              <div className="flex justify-end">
                <Button className="text-sm" onClick={handleSave}>Save changes</Button>
              </div>
            </TabsContent>

            {/* ═══════════════ NOTIFICATIONS TAB ═══════════════ */}
            <TabsContent value="notifications" className="space-y-5">
              <Section title="Lesson notifications">
                <div className="divide-y divide-border">
                  <ToggleRow
                    label="Lesson reminders"
                    description="Get reminded before upcoming lessons"
                    defaultChecked
                  />
                  <ToggleRow
                    label="Booking confirmations"
                    description="Receive confirmation when a lesson is booked"
                    defaultChecked
                  />
                  <ToggleRow
                    label="Cancellation alerts"
                    description="Be notified when a lesson is cancelled"
                    defaultChecked
                  />
                </div>
              </Section>

              <Section title="Messages">
                <div className="divide-y divide-border">
                  <ToggleRow
                    label="New messages"
                    description="Get notified when you receive a new message"
                    defaultChecked
                  />
                  <ToggleRow
                    label={isTutor ? "New inquiries" : "Teacher replies"}
                    description={isTutor ? "Be alerted when a student or parent reaches out" : "Get notified when a teacher responds to your message"}
                    defaultChecked
                  />
                </div>
              </Section>

              <Section title="Email preferences">
                <div className="divide-y divide-border">
                  <ToggleRow
                    label="Weekly summary"
                    description="A digest of your bookings and messages"
                    defaultChecked
                  />
                  <ToggleRow
                    label="Product updates"
                    description="New features and improvements on Kenna"
                    defaultChecked={false}
                  />
                  <ToggleRow
                    label="Marketing emails"
                    description="Tips, offers, and inspiration for learning"
                    defaultChecked={false}
                  />
                </div>
              </Section>

              <Section title="Language">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Display language</p>
                    <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <Globe className="h-3.5 w-3.5" /> Íslenska
                  </Button>
                </div>
              </Section>
            </TabsContent>

            {/* ═══════════════ SUBSCRIPTION / PROFILE STATUS TAB ═══════════════ */}
            <TabsContent value="subscription" className="space-y-5">
              {isTutor ? (
                <>
                  <Section title="Profile status" description="Your visibility and standing on Kenna.">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                            <Eye className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Profile active</p>
                            <p className="text-xs text-muted-foreground">Your profile is visible to students and parents</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Profile completeness</p>
                          <p className="text-xs text-muted-foreground">Complete profiles get more visibility</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted/40">
                            <div className="h-2 w-[85%] rounded-full bg-emerald-500" />
                          </div>
                          <span className="text-xs font-medium text-foreground">85%</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Verified teacher</p>
                          <p className="text-xs text-muted-foreground">Identity and credentials verified</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">Verified</Badge>
                      </div>
                    </div>
                  </Section>

                  <Section title="Premium features" description="Optional features to boost your visibility.">
                    <div className="rounded-lg border border-dashed border-border bg-muted/10 p-5 text-center">
                      <p className="text-sm font-medium text-foreground">Premium visibility coming soon</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Get priority placement in search results and featured teacher spots.
                      </p>
                    </div>
                  </Section>
                </>
              ) : (
                <>
                  <Section title="Your subscription" description="Manage your Kenna plan.">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">Kenna Premium</p>
                            <Badge className="bg-primary text-primary-foreground text-[11px]">Active</Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Unlimited messaging · Full teacher profiles · Priority support
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">4.900 ISK<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-muted-foreground">Billing cycle</p>
                        <p className="text-sm font-medium text-foreground">Monthly</p>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-muted-foreground">Next renewal</p>
                        <p className="text-sm font-medium text-foreground">1 May 2026</p>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-1">
                        <p className="text-sm text-muted-foreground">Payment method</p>
                        <p className="text-sm font-medium text-foreground">•••• 4242</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Manage subscription
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
                        Cancel plan
                      </Button>
                    </div>
                  </Section>

                  <Section title="Billing history">
                    <div className="space-y-2">
                      {[
                        { date: "1 Apr 2026", amount: "4.900 ISK", status: "Paid" },
                        { date: "1 Mar 2026", amount: "4.900 ISK", status: "Paid" },
                        { date: "1 Feb 2026", amount: "4.900 ISK", status: "Paid" },
                      ].map((item) => (
                        <div key={item.date} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">{item.amount}</span>
                            <Badge variant="secondary" className="text-[11px]">{item.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                </>
              )}
            </TabsContent>

            {/* ═══════════════ SECURITY TAB ═══════════════ */}
            <TabsContent value="security" className="space-y-5">
              {/* Trust & verification */}
              <Section
                title={isTutor ? "Trust & verification" : "Account security"}
                description={isTutor ? "Build trust with students and parents." : "Your account is protected."}
              >
                <div className="divide-y divide-border">
                  {isTutor ? (
                    <>
                      <VerificationRow
                        icon={BadgeCheck}
                        label="Identity verified"
                        status="Verified"
                        statusColor="text-emerald-600"
                      />
                      <VerificationRow
                        icon={GraduationCap}
                        label="Education credentials"
                        status="Verified"
                        statusColor="text-emerald-600"
                      />
                      <VerificationRow
                        icon={ShieldCheck}
                        label="Child safety check"
                        status="Approved"
                        statusColor="text-emerald-600"
                      />
                      <VerificationRow
                        icon={FileCheck}
                        label="Background check"
                        status="Completed"
                        statusColor="text-emerald-600"
                      />
                    </>
                  ) : (
                    <>
                      <VerificationRow
                        icon={Mail}
                        label="Email verified"
                        status="Verified"
                        statusColor="text-emerald-600"
                      />
                      <VerificationRow
                        icon={ShieldCheck}
                        label="Trusted platform"
                        status="All teachers verified"
                        statusColor="text-emerald-600"
                      />
                      <VerificationRow
                        icon={Lock}
                        label="Safe messaging"
                        status="Encrypted & monitored"
                        statusColor="text-primary"
                      />
                    </>
                  )}
                </div>
              </Section>

              <Section title="Password" description="Keep your account secure.">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Change password</p>
                    <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs gap-1.5">
                    <Lock className="h-3.5 w-3.5" /> Update
                  </Button>
                </div>
              </Section>

              {/* Account actions */}
              <Section title="Account actions">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 text-sm"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-muted-foreground"
                  >
                    <HelpCircle className="h-4 w-4" /> Contact support
                  </Button>

                  <Separator />

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-destructive"
                  >
                    <AlertTriangle className="h-4 w-4" /> Deactivate account
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-destructive/60 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" /> Delete account
                  </Button>
                </div>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
