import { ScrollView, StyleSheet, Text, View } from "react-native";
import SafeAreaContainer from "../components/SafeAreaContainer";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import Card from "../components/Card";

export default function Terms() {

    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        heading: {
            fontFamily: theme.font700,
            textAlign: 'justify',
            lineHeight: 24,
            fontSize: 18

        },
        para: {
            fontFamily: theme.font500,
            fontSize: 14,
            lineHeight: 21,
            textAlign: 'left',
            marginBottom: 14
        },
        bold: {
            fontFamily: theme.font700
        },

        paraHeading: {
            fontFamily: theme.font700,
            fontSize: 16,
            paddingVertical: 12
        },
        seperator: {
            width: "100%",
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 14
        }

    })

    const ParaHeading = ({ children }) => <Text style={styles.paraHeading}>{children}</Text>;

    const Bold = ({ children }) => <Text style={[styles.bold]}>{children}</Text>;

    const Para = ({ seperator = false, heading, children }) => <>

        <Text style={[styles.para]}>
            {heading && <><Bold>{heading}</Bold> : </>}{children}
        </Text>
        {seperator && <Seperator />}
    </>
    const ParaBold = ({ children }) => <Text style={[styles.para, styles.bold]}>{children}</Text>
    const Seperator = () => <View style={styles.seperator}></View>
    const Ulist = ({ children }) => <>
        <View style={{ flexDirection: "row", gap: 5 }}>
            <Text>{'\u2022'}</Text>
            <Para>{children}</Para>
        </View>
    </>
    return (
        <SafeAreaContainer allowedBack={true}
            screenTitle="Terms & Condition">
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ paddingEnd: 12 }}>
                    <Text style={[styles.heading]}>
                        ONE DENTAL WORLD (ODW) APPLICATION: ULTIMATE COMPREHENSIVE TERMS &
                        CONDITIONS OF USE & PRIVACY POLICY
                    </Text>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                        borderTopColor: theme.border,
                        paddingVertical: 6,
                        marginVertical: 6
                    }}>
                        <Text>
                            Effective Date
                        </Text>
                        <Text>
                            July 31, 2025
                        </Text>
                    </View>


                    <ParaBold style={[styles.para, styles.bold]}>
                        WELCOME TO ONE DENTAL WORLD. THIS IS A LEGALLY BINDING AND EXTREMELY
                        COMPREHENSIVE AGREEMENT. YOUR ATTENTION TO EVERY DETAIL IS REQUIRED.
                        THESE TERMS GOVERN YOUR ACCESS TO AND USE OF OUR SERVICES AND CONTAIN
                        CRITICAL, NON-NEGOTIABLE INFORMATION REGARDING YOUR LEGAL RIGHTS,
                        REMEDIES, AND OBLIGATIONS, INCLUDING VARIOUS ABSOLUTE LIMITATIONS AND
                        EXCLUSIONS OF LIABILITY, INDEMNIFICATION OBLIGATIONS, AND A MANDATORY
                        ARBITRATION CLAUSE THAT REQUIRES THE RESOLUTION OF DISPUTES ON AN
                        INDIVIDUAL BASIS, THEREBY IRREVOCABLY WAIVING YOUR RIGHT TO A JURY TRIAL
                        AND CLASS ACTION PROCEEDINGS.

                    </ParaBold>

                    <Para>
                        This document outlines the exhaustive and all-encompassing Terms and Conditions of Use and
                        Privacy Policy ("Terms") for the One Dental World (ODW) mobile application ("App") and all
                        associated services, features, content, and functionalities provided by One Dental World, LLC
                        ("ODW," "we," "us," or "our"), a Nevada limited liability company. These Terms are meticulously
                        crafted to be as robust, intricate, and legally impenetrable as those governing leading global
                        digital platforms, ensuring maximum clarity on responsibilities, limitations, and the allocation of
                        risk, and aiming to leave no conceivable loophole or ambiguity.

                    </Para>


                    <Card >
                        <ParaHeading>
                            1. DEFINITIONS AND INTERPRETATION

                        </ParaHeading>

                        <Para>
                            <Bold>1.1. Definitions: * App</Bold> : Refers to the One Dental World mobile application, including all current
                            and future versions, updates, upgrades, patches, bug fixes, associated software, code,
                            algorithms, databases, content, user interfaces, features, and functionalities, regardless of the
                            platform (iOS, Android, web, etc.). * User(s): Any individual, entity, or automated system
                            accessing, browsing, downloading, installing, registering for, or otherwise utilizing the ODW App
                            and its Services, whether directly, indirectly, or through any third-party interface. *
                            ODW-Powered Clinic(s): Refers exclusively to licensed dental clinics or practices that have
                            entered into a distinct, separate, and independent contractual agreement (e.g., a space-sharing
                            agreement, independent contractor agreement) with ODW. These clinics agree to provide dental
                            services under the "powered by One Dental World" brand, utilizing ODW's specified protocols,
                            technology, and operational guidelines within their existing physical space on designated days
                            or times. ODW-Powered Clinics are independent legal entities from ODW's corporate
                            structure and are not subsidiaries, affiliates, agents, or employees of ODW. * Protected
                            Health Information (PHI): Individually identifiable health information as defined by the Health
                            Insurance Portability and Accountability Act (HIPAA) and its implementing regulations, including
                            but not limited to demographic data, medical history, test results, insurance information, and
                            other information that can be used to identify an individual and relates to their past, present, or
                            future physical or mental health or condition, or the provision of health care to the individual. *
                            Services: Encompasses all functionalities, features, content, and information provided by the
                            App, including but not limited to, cost estimates, second opinions, price comparison tools,
                            appointment booking and management, insurance integration, secure document upload, access
                            to ODW-Powered Clinics, AI-driven tools or communications, educational content, and any other
                            digital or facilitated services offered by ODW through the App. * User Content: Any and all
                            data, information, images (e.g., X-rays, photographs, scans), documents, text, audio, video, or
                            other materials, including PHI, uploaded, submitted, transmitted, or otherwise made available by
                            the User through the App. * Teledentistry: The delivery of dental care, consultations, and
                            related services remotely through digital communication technologies, encompassing both
                            synchronous (live video) and asynchronous (store-and-forward) methods, as defined by
                            applicable state and federal laws, including Nevada Revised Statutes (NRS) 629.510 and
                            629.515. * Third-Party Providers: Any entity or individual other than ODW or ODW-Powered
                            Clinics, including but not limited to, internet service providers, mobile carriers, payment
                            processors, cloud hosting providers, AI technology developers, or other external service
                            providers.
                            * De-identified Data:
                            Information that has been stripped of all identifiers that could link it to an individual, in
                            accordance with HIPAA de-identification standards. * Aggregated Data: Information about
                            groups or categories of users, which does not identify and cannot reasonably be used to identify
                            an individual user.

                        </Para>

                        <Para heading={"1.2. Interpretation"}>
                            * Headings and subheadings are for convenience only and do not affect the
                            interpretation, construction, or enforceability of this Privacy Policy. * The singular includes the
                            plural and vice versa, and words importing one gender include all genders. * "Including" means
                            "including without limitation" or "including but not limited to." * Any reference to a statute or
                            regulation includes any amendments, re-enactments, or modifications thereof. * This Privacy
                            Policy shall be construed as broadly as possible to protect ODW and limit its liability to the
                            maximum extent permitted by law, and any ambiguity shall be resolved in favor of ODW. * The
                            use of "shall" or "must" indicates a mandatory obligation, while "may" indicates a discretionary
                            right.
                        </Para>
                    </Card>

                    <Card>
                        <ParaHeading>2. SCOPE OF THIS PRIVACY POLICY AND ACKNOWLEDGMENT OF RISK</ParaHeading>
                        <Para>This Privacy Policy applies to all information collected by ODW through your use of the ODW
                            App and its Services. It details our practices concerning the collection, use, storage, protection,
                            and disclosure of your Personal Information and PHI.
                        </Para>

                        <Para heading={"Important Note on Third-Party Services"}>This Privacy Policy does not apply to the practices of
                            third parties that ODW does not own or control, including but not limited to, ODW-Powered
                            Clinics when they are operating outside of ODW's specific branded services, or any third-party
                            websites, applications, or services that you may access through links in the App. We encourage
                            you to review the privacy policies of any third parties before providing them with your
                            information.
                        </Para>
                        <Para heading={"User Acknowledgment of Inherent Risks"}>You acknowledge that the transmission of
                            information over the internet and mobile networks carries inherent risks, including the risk of
                            interception, unauthorized access, and data breaches. While ODW implements robust security
                            measures, as detailed in Section 6, <Bold>ODW CANNOT AND DOES NOT GUARANTEE
                                ABSOLUTE SECURITY OF YOUR DATA. </Bold>You understand and accept that no system is entirely
                            immune to sophisticated cyberattacks, technical failures, or human error. Your use of the App
                            and transmission of information is undertaken at your own sole and exclusive risk.
                        </Para>
                    </Card>

                    <Card>
                        <ParaHeading>3. DATA COLLECTION: CATEGORIES OF INFORMATION WE COLLECT</ParaHeading>
                        <Para>ODW collects various categories of information from and about you, which may include
                            Personal Information and PHI, through various methods, including direct input from you,
                            automated technologies, and third-party sources.</Para>
                        <Para heading={"3.1. Information You Provide Directly to Us"}>* Account Registration Data: When you create
                            an account, you provide your full name, address, phone number, email address, date of birth,
                            and gender. This information is essential for identifying you and providing personalized services.
                            * Health Information (PHI): This is highly sensitive data crucial for providing our Services. *
                            Medical and Dental History: Comprehensive information about your past and present health
                            conditions, allergies, medications, previous dental treatments, and relevant family medical
                            history. * Dental Records: Digital dental charts, detailed dental notes, X-rays, intraoral and
                            extraoral photographs, 3D scans, digital impressions, and other diagnostic images. * Treatment
                            Plans: Information related to proposed or actual dental treatment plans, including specific
                            procedures, materials, and associated details. * Symptoms and Concerns: Detailed
                            descriptions of your dental symptoms, concerns, and reasons for seeking care or a second
                            opinion. * Lab Results: Information from dental lab work, if applicable. * Sensitive Information:
                            Any other health-related data that is clearly or inherently medical data, or raw data obtained
                            from sensors, which is processed by the App and can be used independently or combined with
                            other data to come to a conclusion about your health status or potential health risks. This
                            includes information derived from the testing or examination of a body part or bodily substance,
                            information about disease risks, and information about your actual physiological or biomedical
                            state. * Financial and Insurance Information: * Insurance Details: Your dental insurance
                            provider, policy number, group number, subscriber ID, and other relevant insurance identification
                            information to facilitate benefit verification and claims processing. * Payment Information:
                            Credit card details or other payment method information when you make payments through the
                            App. For your security, this data is typically processed by secure, PCI-compliant third-party
                            payment processors, and ODW does not directly store full payment card numbers on its servers.
                            * Billing History: Records of payments made, services billed, and outstanding balances. * User
                            Content: Any documents, images, videos, or text you upload or input into the App, such as
                            scanned treatment plans from other providers, personal notes, or responses to questionnaires.
                            This content is integral to the "Second Opinion" and "Get Estimate" features. * Communication
                            Data: Records of your communications with ODW customer support, feedback, survey
                            responses, and any messages exchanged through the App's secure messaging features. This
                            helps us improve our service and address your needs. * Appointment Details: Your preferred
                            appointment times, locations, specific requests related to your dental visits, and any special
                            accommodations required.
                        </Para>
                        <Para heading={"3.2. Information Collected Automatically"}>* Usage Data: When you access and use the App,
                            we automatically collect information about your interactions to understand how the App is used
                            and to improve its functionality. This includes: * Device Information: Device type, operating
                            system, unique device identifiers (e.g., IMEI, MAC address), mobile network information,
                            browser type, screen resolution, and device settings. * Log Data: IP address, access dates and
                            times, pages viewed, features used, and interactions within the App (e.g., buttons clicked,
                            duration of sessions, navigation paths). * App Performance Data: Information about crashes,
                            errors, loading times, and other performance issues to help us diagnose and fix problems and
                            optimize user experience. * Location Data: With your explicit consent, we may collect precise
                            or approximate location data from your mobile device using GPS, Wi-Fi, or cellular network
                            triangulation. This is used to provide location-based services, such as finding nearby
                            ODW-Powered Clinics or tailoring content to your geographic area. You can typically disable
                            location services through your device settings. * Cookies and Tracking Technologies: We use
                            cookies, web beacons, pixels, and similar technologies to collect information about your
                            browsing activities, preferences, and interactions with the App. This helps us remember your
                            preferences, analyze usage patterns, and deliver relevant content. (See Section 10 for more
                            details).
                        </Para>
                        <Para heading={"3.3. Information Collected from Third-Party Sources"}>* ODW-Powered Clinics: When you
                            receive services at an ODW-Powered Clinic, they may share relevant clinical, administrative,
                            and billing information with ODW to ensure continuity of care, facilitate billing, and manage your
                            overall ODW experience, in accordance with HIPAA and our Business Associate Agreements. *
                            Insurance Providers: We may receive information from your insurance provider regarding your
                            benefits, eligibility, and claims status to assist with cost estimates and billing. * Third-Party
                            Service Providers: We may receive information from Third-Party Providers that assist us with
                            analytics, marketing, or other business operations, provided such sharing is compliant with
                            applicable privacy laws and our contractual agreements. * Publicly Available Sources: We
                            may collect information from publicly available sources (e.g., public directories, social media
                            profiles) to verify your identity, for marketing purposes, or to enhance our user profiles, where
                            permitted by law.</Para>
                    </Card>
                    <Card>
                        <ParaHeading>4. LEGAL BASIS FOR PROCESSING YOUR DATA</ParaHeading>
                        <Para>ODW processes your Personal Information and PHI based on one or more of the following legal
                            bases, as applicable, ensuring compliance with relevant data protection laws:
                        </Para>
                        <Para heading={"4.1. Your Explicit Consent"}>For the processing of sensitive data, such as PHI and precise
                            location data, we obtain your explicit, affirmative consent. This consent is obtained clearly and
                            accessibly before you install the App or submit such data. You have the right to withdraw your
                            consent at any time, subject to certain limitations (see Section 8). Withdrawal of consent will not
                            affect the lawfulness of processing based on consent before its withdrawal.</Para>
                        <Para heading={"4.2. Performance of a Contract"}>We process your data when it is necessary for the
                            performance of a contract with you, or to take steps at your request prior to entering into a
                            contract. This includes providing the Services you request (e.g., facilitating appointment
                            booking, processing payments, delivering estimates and second opinions).</Para>
                        <Para heading={"4.3. Legal Obligation"}>We process your data when it is necessary to comply with a legal or
                            regulatory obligation to which ODW is subject. This includes, but is not limited to, compliance
                            with HIPAA, the Federal Trade Commission (FTC) Act, state dental board regulations, and
                            responding to lawful requests from public authorities.
                        </Para>
                        <Para heading={"4.4. Legitimate Interests"}>We may process your data for our legitimate business interests,
                            provided that these interests do not override your fundamental rights and freedoms. Examples
                            include: * Improving and optimizing our Services and App functionality. * Conducting internal
                            analytics, research, and development. * Preventing fraud, abuse, and ensuring the security and
                            integrity of our systems. * Enforcing our Terms and Conditions of Use. * Marketing our Services
                            (where consent is not required or has been obtained).
                        </Para>
                        <Para heading={"4.5. Vital Interests"}>In rare and exceptional circumstances, we may process your data to
                            protect your vital interests or the vital interests of another natural person (e.g., in a medical
                            emergency where consent cannot be obtained).</Para>
                    </Card>

                    <Card>
                        <ParaHeading>5. PURPOSE OF DATA COLLECTION AND PROCESSING</ParaHeading>
                        <Para>
                            ODW collects and processes your Personal Information and PHI for the following explicit,
                            legitimate, and compatible purposes, which are integral to the operation of the App and the
                            provision of Services:
                        </Para>
                        <Para heading={"5.1. To Provide and Manage Services"}>* To create, maintain, and manage your user account
                            and profile, ensuring accurate and up-to-date information. * To facilitate seamless appointment
                            booking, rescheduling, and cancellation with ODW-Powered Clinics, providing you with control
                            over your schedule. * To generate and deliver non-binding cost estimates for dental procedures
                            based on your submitted information and insurance details, promoting financial transparency. *
                            To facilitate informational second opinions from licensed dental professionals based on your
                            User Content, empowering you with additional perspectives. * To enable secure document
                            upload and management within your patient profile (e.g., X-rays, treatment plans), centralizing
                            your dental records. * To process payments for services rendered through the App, ensuring
                            smooth financial transactions. * To integrate with your insurance plans for benefit verification
                            and claims submission, maximizing your coverage. * To provide you with access to educational
                            content and resources related to dental health, promoting informed decision-making.
                        </Para>
                        <Para heading={"5.2. To Communicate with You"}>* To send you essential service-related communications,
                            including appointment reminders, confirmations, and updates via push notifications, SMS, or
                            email. * To respond promptly and effectively to your inquiries, feedback, and customer support
                            requests. * To send you critical service-related announcements, administrative messages, and
                            important updates regarding the App, your account, or changes to our policies. * To send you
                            marketing and promotional communications about ODW's services, special offers, or new
                            features, where you have provided explicit consent or where permitted by law.</Para>
                        <Para heading={"5.3. For Internal Operations and Service Improvement"}>* To perform rigorous data analytics,
                            comprehensive research, and statistical analysis to understand user behavior, identify trends,
                            improve App functionality, and enhance the overall quality and effectiveness of our Services. *
                            To develop, refine, and train our Artificial Intelligence (AI) models using anonymized and
                            de-identified User Content to improve diagnostic assistance, scheduling optimization, and other
                            AI-driven features, thereby enhancing the efficiency and accuracy of our platform. * To monitor
                            and analyze trends, usage patterns, and activities in connection with our Services to optimize
                            user experience and resource allocation. * To troubleshoot technical issues, diagnose problems,
                            and ensure the smooth, uninterrupted operation of the App. * To manage and optimize our
                            business operations, including resource allocation, efficiency improvements, and strategic
                            planning.
                        </Para>
                        <Para heading={"5.4. For Security and Fraud Prevention"}>* To detect, prevent, and investigate fraudulent,
                            abusive, or unauthorized activities, safeguarding the integrity of our platform. * To protect the
                            security and integrity of the App, our systems, and your data against unauthorized access, use,
                            or disclosure. * To verify your identity and prevent unauthorized access to your account.</Para>
                        <Para heading={"5.5. For Legal and Regulatory Compliance"}>* To comply with all applicable federal, state, and
                            local laws and regulations, including HIPAA, the Federal Trade Commission (FTC) Act, state
                            dental board requirements, and consumer protection laws. * To respond to lawful requests from
                            governmental authorities, court orders, or legal processes. * To enforce our Terms and
                            Conditions of Use and other agreements, including the collection of debts. * To establish,
                            exercise, or defend legal claims.
                        </Para>
                    </Card>
                    <Card>
                        <ParaHeading>6. DATA STORAGE, SECURITY MEASURES, AND ROBUST PROTECTION EFFORTS</ParaHeading>
                        <Para>
                            ODW implements stringent, multi-layered administrative, physical, and technical safeguards
                            designed to ensure the confidentiality, integrity, and availability of your Personal Information and
                            PHI. These measures are continuously reviewed, updated, and enhanced to address evolving
                            cybersecurity threats and comply with HIPAA Security Rule requirements.<Bold> HOWEVER, YOU
                                ACKNOWLEDGE AND ACCEPT THE INHERENT RISKS OUTLINED IN SECTION 2.5 AND
                                6.4.</Bold>

                        </Para>
                        <Para heading={"6.1. Technical Safeguards: "}></Para>


                        <Para heading={"* Encryption"} seperator={true}>All sensitive data, including PHI, is encrypted both in
                            transit (using robust Transport Layer Security (TLS) protocols, ensuring secure communication
                            channels) and at rest (using Advanced Encryption Standard (AES) algorithms, or equivalent
                            industry-leading encryption, protecting data stored on servers and devices). This dual-layer
                            encryption strategy is designed to protect data from unauthorized access during transmission
                            and storage.</Para>
                        <Para heading={"* Strong Authentication and Access Control"} seperator={true}>We employ robust authentication
                            mechanisms, such as multi-factor authentication (2FA) and biometric authentication, to ensure
                            only authorized users can access sensitive data. Internal access control mechanisms strictly
                            limit ODW personnel access based on roles, responsibilities, and the principle of least privilege,
                            ensuring that only those with a legitimate need can access PHI.</Para>
                        <Para heading={"* Secure APIs"} seperator={true}>All Application
                            Programming Interfaces (APIs) are secured with industry-standard authentication and
                            authorization protocols to prevent unauthorized access to sensitive data during data exchange
                            with other systems. APIs are regularly monitored, audited, and updated to address potential
                            vulnerabilities. </Para>

                        <Para heading={"* Regular Software Updates and Patching"} seperator={true}>The App and all underlying
                            software, systems, and infrastructure are regularly updated with the latest security patches and
                            configurations to protect against known vulnerabilities and emerging threats. This proactive
                            approach minimizes exposure to exploits.</Para>
                        <Para heading={"* Comprehensive Monitoring and Logging"} seperator={true}>We
                            implement continuous monitoring and logging mechanisms to track all access to patient data,
                            detect unauthorized or suspicious activity, and enable prompt incident response. This includes
                            detailed audit trails of data access and modifications for accountability. </Para>
                        <Para heading={"* Network Security"} seperator={true}> Implementation of advanced firewalls, intrusion detection/prevention systems, and secure
                            network configurations to protect against unauthorized access and cyberattacks.</Para>
                        <Para heading={"* Data Minimization and Anonymization"} seperator={true}>We adhere strictly to the principle of data minimization,
                            collecting only the data necessary for the stated purposes. Where feasible and appropriate, data
                            is anonymized or de-identified to protect patient identities, particularly for research, analytics,
                            and AI model training, rendering it outside the scope of PHI.
                        </Para>

                        <Para heading={"6.2. Physical Safeguards"} />
                        <Para seperator={true} heading={"* Secure Facilities"}>Strict access controls are in place for physical
                            locations where servers or devices storing patient data are housed, including environmental
                            controls, surveillance, and restricted access to authorized personnel only. </Para>
                        <Para seperator={true} heading={"* Device Security"}>Policies and procedures for securing mobile devices used to access patient information,
                            including encryption, password protection, and remote wipe capabilities.
                        </Para>
                        <Para heading={"6.3. Administrative Safeguards"}></Para>
                        <Para seperator={true} heading={"* Employee Training"}>All ODW employees and personnel
                            are regularly trained on data protection policies, HIPAA compliance, and best practices for
                            handling sensitive information. This includes ongoing education on privacy regulations, security
                            protocols, and incident response procedures.</Para>
                        <Para seperator={true} heading={"* Policies and Procedures"}>Establishment of
                            clear, comprehensive data protection policies and procedures, including incident response
                            plans, data backup and recovery plans, and contingency plans to ensure business continuity
                            and data integrity.</Para>
                        <Para seperator={true} heading={"* Business Associate Agreements (BAAs)"}>We enter into legally binding
                            Business Associate Agreements with all third-party service providers who handle PHI on our
                            behalf, ensuring they are also compliant with HIPAA regulations and contractually obligated to
                            protect your privacy and security.</Para>
                        <Para seperator={true} heading={"* Regular Audits and Risk Assessments"}> We conduct
                            frequent, comprehensive security audits, penetration testing (where ethical hackers attempt to
                            exploit potential weaknesses), and rigorous risk assessments to proactively identify and mitigate
                            vulnerabilities in our systems and processes.
                        </Para>
                        <Para heading={"6.4. NO ABSOLUTE SECURITY GUARANTEE; INHERENT RISKS ACKNOWLEDGED"}>
                            WHILE ODW IMPLEMENTS ROBUST SECURITY MEASURES DESIGNED TO PROTECT
                            YOUR DATA AND WILL EXERT ITS BEST EFFORTS TO ADHERE TO HIPAA AND PROTECT
                            YOUR PHI, YOU ACKNOWLEDGE AND AGREE THAT NO METHOD OF TRANSMISSION
                            OVER THE INTERNET OR METHOD OF ELECTRONIC STORAGE IS 100% SECURE.
                            THEREFORE, ODW CANNOT AND DOES NOT GUARANTEE THE ABSOLUTE SECURITY
                            OF YOUR DATA. YOU UNDERSTAND AND ACCEPT THAT DESPITE OUR BEST EFFORTS,
                            THE COMPLEXITY OF CYBERSECURITY THREATS, THE INHERENT VULNERABILITIES
                            OF INTERNET-BASED SYSTEMS, AND THE POTENTIAL FOR UNFORESEEN TECHNICAL
                            FAILURES OR MALICIOUS ATTACKS MEAN THAT ABSOLUTE SECURITY CANNOT BE
                            GUARANTEED. ODW EXPRESSLY DISCLAIMS ALL LIABILITY FOR ANY UNAUTHORIZED
                            ACCESS, LOSS, THEFT, CORRUPTION, OR MISUSE OF YOUR DATA, INCLUDING PHI, TO
                            THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EVEN IF SUCH AN EVENT
                            OCCURS DESPITE OUR IMPLEMENTATION OF REASONABLE SECURITY MEASURES.
                            YOUR USE OF THE APP AND TRANSMISSION OF INFORMATION IS UNDERTAKEN AT
                            YOUR OWN SOLE AND EXCLUSIVE RISK.
                        </Para>


                    </Card>
                    <Card>
                        <ParaHeading>7. DATA SHARING AND DISCLOSURE</ParaHeading>
                        <Para>ODW will not sell, rent, or lease your Personal Information or PHI to third parties for their
                            independent marketing purposes. We may share or disclose your data in the following strictly
                            defined circumstances, always in compliance with applicable laws and regulations, including
                            HIPAA, and only to the extent necessary for the stated purposes:</Para>
                        <Para heading={"7.1. With ODW-Powered Clinics"}>As necessary to provide you with in-person dental care,
                            manage your appointments, and ensure continuity of care within the ODW network. This
                            includes sharing your dental records, treatment plans, and other relevant PHI with the specific
                            ODW-Powered Clinic you visit. This sharing is governed by strict contractual agreements and
                            HIPAA-compliant Business Associate Agreements.
                        </Para>
                        <Para heading={"7.2. With Third-Party Service Providers"}>We may engage trusted Third-Party Providers to
                            perform services on our behalf that require access to your data. These services include, but are
                            not limited to: * Cloud hosting and data storage (e.g., secure HIPAA-compliant cloud
                            infrastructure). * Payment processing (e.g., PCI-compliant payment gateways). * AI technology
                            providers (e.g., for diagnostic assistance, scheduling optimization, chatbot functionality). *
                            Communication platforms (e.g., for SMS reminders, email notifications, secure messaging). *
                            Analytics and performance monitoring tools. * Customer support services. All such Third-Party
                            Providers are rigorously vetted, contractually obligated to protect your data, adhere to strict
                            confidentiality requirements, and comply with HIPAA through legally binding Business Associate
                            Agreements (BAAs) where applicable. ODW is not responsible for the independent actions or
                            omissions of these Third-Party Providers outside the scope of their contracted services to ODW.
                        </Para>
                        <Para heading={"7.3. For Legal and Regulatory Compliance"}>We may disclose your data if required by law,
                            court order, governmental regulation (e.g., HIPAA, FTC Act, state dental board regulations), or
                            in response to a valid subpoena, warrant, or other legal process. This includes disclosures
                            necessary to: * Comply with information blocking regulations, while ensuring privacy and
                            security safeguards are met. * Respond to requests from law enforcement or other public
                            authorities. * Protect the rights, property, or safety of ODW, our users, or the public. * Enforce
                            our Terms and Conditions of Use and other agreements. * Investigate and prevent fraud,
                            security breaches, or illegal activities.
                        </Para>
                        <Para heading={"7.4. For Anonymized or De-identified Research and Improvement"}>We may share
                            Aggregated, anonymized, or De-identified Data for research, analytics, and to improve our
                            Services, including our AI models. This data is processed to ensure it cannot be used to identify
                            you, and its use is strictly for non-commercial purposes related to service enhancement, public
                            health insights, and academic research.
                        </Para>
                        <Para heading={"7.5. In Case of Business Transfer"}>In the event of a merger, acquisition, reorganization, sale of
                            all or a portion of our assets, or other change of control, your data may be transferred to the
                            acquiring entity. We will ensure that the acquiring entity is committed to protecting your privacy
                            in accordance with this Privacy Policy and applicable laws.
                        </Para>
                        <Para heading={"7.6. With Your Explicit Consent"}>We may share your data with other third parties when you
                            provide us with your explicit, affirmative consent to do so. This consent will be obtained clearly
                            and specifically for each instance of sharing.
                        </Para>


                    </Card>
                    <Card>
                        <ParaHeading>8. YOUR RIGHTS REGARDING YOUR DATA</ParaHeading>
                        <Para>
                            You have certain fundamental rights concerning your Personal Information and PHI, subject to
                            applicable laws and regulations. ODW is committed to facilitating the exercise of these rights,
                            though certain limitations may apply as permitted by law.

                        </Para>

                        <Para heading={"8.1. Right to Access and Copy"}>You have the right to access and obtain a copy of your PHI
                            that ODW maintains. We will provide this information in a timely and accessible format, typically
                            within 30 days of your request.
                        </Para>
                        <Para heading={"8.2. Right to Amendment"}>You have the right to request amendments to your PHI if you
                            believe it is inaccurate or incomplete. We will review your request and make appropriate
                            corrections or add your requested amendment to your record, and notify you of the outcome.</Para>
                        <Para heading={"8.3. Right to Request Restrictions"}>You may request restrictions on the use or disclosure of
                            your PHI for treatment, payment, or healthcare operations. While we will consider your request,
                            ODW is not required to agree to all requested restrictions, especially if it would impede
                            necessary care, legal obligations, or our ability to operate the App.
                        </Para>
                        <Para heading={"8.4. Right to Confidential Communications"}>You may request to receive communications of
                            PHI by alternative means or at alternative locations (e.g., receiving appointment reminders at a
                            specific email address rather than your primary one). We will accommodate reasonable
                            requests.
                        </Para>
                        <Para heading={"8.5. Right to an Accounting of Disclosures"}>You have the right to receive an accounting of
                            certain disclosures of your PHI made by ODW, excluding disclosures for treatment, payment,
                            healthcare operations, or those made with your authorization.
                        </Para>
                        <Para heading={"8.6. Right to Withdraw Consent"}>Where we rely on your consent to process your data, you
                            have the right to withdraw that consent at any time. Withdrawal of consent will not affect the
                            lawfulness of processing based on consent before its withdrawal. Please note that withdrawing
                            consent may impact your ability to use certain App features or Services that rely on that
                            consent.
                        </Para>
                        <Para heading={"8.7. Right to Deletion ('Right to Be Forgotten')"}>You may request the deletion of your
                            account and associated data. We will comply with such requests, subject to our legal and
                            operational retention requirements (e.g., for medical record keeping, billing, fraud prevention, or
                            legal compliance). Please be aware that complete deletion of all data may not be possible due
                            to legal obligations or technical limitations.</Para>
                        <Para heading={"8.8. Right to Data Portability"}>You may have the right to receive your data in a structured,
                            commonly used, and machine-readable format and to transmit that data to another controller,
                            where technically feasible and where the processing is based on consent or contract.
                        </Para>
                        <Para heading={"8.9. Right to Object to Processing"}>You may have the right to object to the processing of your
                            data in certain circumstances, such as for direct marketing purposes or when processing is
                            based on legitimate interests.
                        </Para>
                        <Para heading={"8.10. Exercising Your Rights"}>To exercise any of these rights, please contact our Privacy
                            Officer using the contact information provided in Section 15. We may require you to verify your
                            identity before processing your request to ensure the security of your data. We will respond to
                            your request within the timeframes required by applicable law (e.g., 30 days for access requests
                            under HIPAA).
                        </Para>

                    </Card>
                    <Card>
                        <ParaHeading>
                            9. DATA RETENTION POLICY

                        </ParaHeading>
                        <Para>
                            ODW retains your Personal Information and PHI for as long as necessary to fulfill the purposes
                            for which it was collected, to provide our Services, to comply with legal and regulatory
                            obligations (e.g., medical record retention laws, state dental board requirements, tax laws), to
                            resolve disputes, and to enforce our agreements.
                        </Para>
                        <Para>
                            The specific retention periods vary significantly depending on the type of data and the purpose
                            of processing. For example:

                        </Para>
                        <Para heading={"Medical/Dental Records (PHI)"}>
                            Retained for periods mandated by state and federal
                            healthcare laws (e.g., Nevada law may require retention for a certain number of years
                            after the last patient encounter or after the patient reaches the age of majority). These
                            periods are often lengthy to ensure continuity of care and for legal defense.
                        </Para>
                        <Para heading={"Financial Transaction Data"}>
                            Retained for periods required by tax and accounting laws,
                            typically 7-10 years.

                        </Para>

                        <Para heading={"Account Information"}>Retained as long as your account is active and for a period
                            thereafter to facilitate re-activation or for legal compliance.
                        </Para>
                        <Para heading={"Usage Data"}>Retained for shorter periods for analytics and performance monitoring, or
                            indefinitely in an anonymized/de-identified form where it no longer constitutes Personal
                            Information.
                        </Para>
                        <Para heading={"Communication Records"}>Retained for a period necessary to manage customer service
                            inquiries and for legal compliance</Para>
                        <Para>
                            Upon the expiration of the applicable retention period, your data will be securely deleted,
                            anonymized, or de-identified in accordance with ODW's data destruction policies and industry
                            best practices.

                        </Para>
                    </Card>

                    <Card>
                        <ParaHeading>
                            10. THIRD-PARTY LINKS AND SERVICES


                        </ParaHeading>
                        <Para heading={"10.1. Types of Technologies Used"} />
                        <Para seperator={true} heading={"* Cookies"}>Small text files stored on your device when you
                            access the App. They help us remember your preferences, maintain your login status, and
                            personalize your experience. </Para>
                        <Para seperator={true} heading={"* Session Cookies"}>Temporary cookies that are deleted
                            automatically when you close your browser or App.</Para>
                        <Para seperator={true} heading={"* Persistent Cookies"}>Remain on your
                            device for a set period or until you manually delete them, used for remembering preferences,
                            login details, or tracking over time.</Para>
                        <Para seperator={true} heading={"* Web Beacons/Pixels"}>Small graphic images or code
                            snippets embedded in web pages or emails, used to track user activity, measure the
                            effectiveness of marketing campaigns, or count visitors.</Para>
                        <Para seperator={true} heading={"* Local Storage"}>Technologies like
                            HTML5 Local Storage or browser cache that store information directly on your device, similar to
                            cookies but with larger storage capacity.</Para>
                        <Para seperator={true} heading={"* Device Identifiers"}>Unique identifiers associated with
                            your mobile device (e.g., IDFA on iOS, Android Advertising ID on Android) used for analytics,
                            advertising, and app performance tracking.</Para>
                        <Para seperator={true} heading={"* SDKs (Software Development Kits)"}>Third-party
                            code embedded in our App that allows us to collect data about your interactions and device.</Para>

                        <Para heading={"10.2. Purposes of Using Tracking Technologies"}></Para>

                        <Para seperator={true} heading={"* Essential/Strictly Necessary"}>
                            Required
                            for the App to function correctly, enabling core features like secure login, session management,
                            and access to secure areas of your account. Without these, the App may not operate as
                            intended.
                        </Para>
                        <Para seperator={true} heading={"* Performance/Analytics"}>
                            To collect information about how users interact with the
                            App (e.g., pages visited, features used, time spent, crash reports). This helps us understand
                            usage patterns, identify areas for improvement, optimize App performance, and diagnose
                            technical issues.
                        </Para>
                        <Para seperator={true} heading={"* Functionality"}>
                            To remember your preferences (e.g., language, region,
                            display settings) and provide enhanced, more personalized features and content.
                        </Para>

                        <Para seperator={true} heading={"* Advertising/Targeting"}>
                            To deliver relevant advertisements to you on third-party platforms
                            based on your interests and App usage.
                        </Para>

                        <Para seperator={true} heading={"ODW does not use PHI for advertising purposes"}>
                            We may use de-identified or aggregated data for these purposes.
                        </Para>
                        <Para seperator={true} heading={"* Security"}>
                            To detect and prevent fraudulent activity, enhance the security of the App, and protect against unauthorized
                            access.
                        </Para>
                        <Para heading={"10.3. Your Choices Regarding Tracking Technologies"} />
                        <Para heading={"* Browser Settings"} seperator={true}> Most web
                            browsers allow you to control cookies through their settings. You can typically set your browser
                            to refuse all cookies, to indicate when a cookie is being sent, or to delete cookies. However, if
                            you disable cookies, some features of the App may not function properly. </Para>

                        <Para heading={"* Mobile Device Settings"} seperator={true}>Your mobile device may offer settings to control tracking for advertising purposes
                            (e.g., "Limit Ad Tracking" on iOS, "Opt out of Ads Personalization" on Android). You can reset
                            your device's advertising identifier at any time.</Para>
                        <Para heading={"* Opt-Out Tools"} seperator={true}>You may be able to opt out of
                            certain third-party advertising networks by visiting industry opt-out pages (e.g., Network
                            Advertising Initiative, Digital Advertising Alliance).</Para>
                        <Para heading={"* App-Specific Controls"} >The App may
                            provide specific controls within its settings to manage certain tracking preferences. * Consent
                            Management: Where required by law, we will obtain your explicit consent for the use of
                            non-essential cookies and tracking technologies.</Para>



                    </Card>

                    <Card>
                        <ParaHeading>
                            11. THIRD-PARTY LINKS AND SERVICES


                        </ParaHeading>
                        <Para>
                            The ODW App may contain links to third-party websites, applications, or services that are not
                            owned or controlled by ODW. This includes links to external resources, informational sites, or
                            services provided by our partners. ODW has no control over, and assumes no responsibility for,
                            the content, privacy policies, or practices of any third-party websites or services. You
                            acknowledge and agree that ODW shall not be responsible or liable, directly or indirectly, for any
                            damage or loss caused or alleged to be caused by or in connection with the use of or reliance
                            on any such content, goods, or services available on or through any such websites or services.
                            We strongly advise you to read the terms and conditions and privacy policies of any third-party
                            websites or services that you visit before providing them with any personal information.

                        </Para>
                    </Card>


                    <Card>
                        <ParaHeading>
                            12. CHILDREN'S PRIVACY

                        </ParaHeading>
                        <Para>
                            The ODW App and its Services are strictly intended for individuals who are eighteen (18) years
                            of age or older. Our App is not designed for, marketed to, or intended for use by children under
                            the age of 13 or the equivalent minimum age in the relevant jurisdiction. We do not knowingly
                            collect Personal Information or PHI from children under 13. If we learn that we have
                            inadvertently collected the personal information of a child under 13, we will take immediate
                            steps to delete the information as soon as possible. If you believe that we might have any
                            information from or about a child under 13, please contact us immediately using the contact
                            information provided in Section 15.
                        </Para>
                    </Card>

                    <Card>
                        <ParaHeading>
                            13. INTERNATIONAL DATA TRANSFERS

                        </ParaHeading>
                        <Para>
                            ODW is based in the United States, and our servers and primary data processing facilities are
                            located in the United States. If you access the App from outside the United States, your
                            information will be transferred to, stored, and processed in the United States. The data
                            protection laws in the United States may differ from those in your country of residence. By using
                            the App, you consent to the transfer of your information to the United States and its processing
                            as described in this Privacy Policy.</Para>
                        <Para>
                            For users in jurisdictions with specific data transfer requirements (e.g., GDPR in the European
                            Union), ODW will implement appropriate safeguards for international data transfers, such as
                            Standard Contractual Clauses (SCCs) or other legally recognized mechanisms, to ensure your
                            data receives an adequate level of protection as required by applicable law.</Para>
                    </Card>

                    <Card>
                        <ParaHeading>
                            14. CHANGES TO THIS PRIVACY POLICY
                        </ParaHeading>
                        <Para>
                            ODW reserves the absolute and unilateral right, in its sole and unfettered discretion, to revise,
                            modify, or update this Privacy Policy at any time, without prior notice. All changes are effective
                            immediately when we post the revised Privacy Policy on the App or through other reasonable
                            means (e.g., email notification, in-app pop-up) and apply to all access to and use of the App
                            thereafter. Your continued access to or use of the App after the posting of any revised Privacy
                            Policy signifies your unconditional acceptance of all the terms and conditions contained within
                            the revised Privacy Policy. You are solely responsible for regularly reviewing the Privacy Policy
                            posted to the App. We will indicate the "Effective Date" at the top of this Privacy Policy to reflect
                            the date of the most recent revisions.

                        </Para>
                    </Card>

                    <Card>
                        <ParaHeading>
                            15. CONTACT INFORMATION AND COMPLAINT MECHANISMS

                        </ParaHeading>
                        <Para>
                            If you have any questions, concerns, or complaints regarding this Privacy Policy, our data
                            practices, or if you wish to exercise your data rights, please contact our designated Privacy
                            Officer:


                        </Para>
                        <Bold>
                            Privacy Officer
                        </Bold>
                        <Para seperator={true}>
                            One Dental World, LLC [Insert Physical Address] [Insert Email Address] [Insert
                            Phone Number]
                        </Para>
                        <Para>
                            We are committed to resolving any complaints about our collection or use of your personal data.
                            If you have a complaint regarding our compliance with this Privacy Policy, please contact us
                            first. We will investigate and attempt to resolve complaints and disputes regarding the use and
                            disclosure of Personal Information in accordance with the principles contained in this Privacy
                            Policy.

                        </Para>
                        <Para>
                            You also have the right to lodge a complaint with a supervisory authority, particularly in the state
                            of Nevada or your country of residence, if you believe that your privacy rights have been
                            violated.
                        </Para>
                    </Card>


                    <Card>
                        <ParaHeading>
                            16. GOVERNING LAW AND DISPUTE RESOLUTION

                        </ParaHeading>
                        <Para>
                            This Privacy Policy shall be governed by and construed in accordance with the laws of the State
                            of Nevada, without regard to its conflict of law principles.
                            Any dispute, claim, or controversy arising out of or relating to this Privacy Policy or ODW's data
                            practices shall be subject to the dispute resolution provisions, including mandatory binding
                            arbitration and class action waiver, as set forth in the comprehensive Terms and Conditions of
                            Use for the ODW App. By agreeing to this Privacy Policy, you also agree to be bound by those
                            dispute resolution provisions.


                        </Para>
                    </Card>

                    <Card >
                        <ParaHeading>
                            17. GENERAL PROVISIONS
                        </ParaHeading>
                        <Para seperator={true} heading="17.1. Severability">
                            If any provision of this Privacy Policy is found by a court of competent
                            jurisdiction or an arbitrator to be unlawful, void, or for any reason unenforceable, then that
                            provision shall be deemed severable from this Privacy Policy and shall not affect the validity and
                            enforceability of any remaining provisions.


                        </Para>

                        <Para seperator={true} heading={"17.2. Entire Agreement"}>
                            This Privacy Policy, together with the Terms and Conditions of Use
                            and any other legal notices published by ODW on the App, constitutes the entire agreement
                            between you and ODW concerning your privacy and data practices.
                        </Para>

                        <Para seperator={true} heading={"17.3. No Waiver"}>
                            No waiver by ODW of any term or condition set forth in this Privacy Policy
                            shall be deemed a further or continuing waiver of such term or condition or a waiver of any other
                            term or condition, and any failure of ODW to assert a right or provision under this Privacy Policy
                            shall not constitute a waiver of such right or provision.

                        </Para>

                        <Para seperator={true} heading={"17.4. Survival"}>
                            The provisions of this Privacy Policy relating to data collection, use, storage,
                            security, sharing, disclaimers, limitations of liability, indemnification, dispute resolution, and
                            intellectual property shall survive any termination or expiration of your use of the App or your
                            account.


                        </Para>

                        <Para seperator={true} heading={"17.5. Assignment"}>
                            ODW may freely assign or transfer this Privacy Policy without restriction.
                            You may not assign or transfer this Privacy Policy without ODW's prior written consent.

                        </Para>

                        <Para seperator={true} heading={"17.6.  Force Majeure"}>
                            ODW shall not be liable for any delay or failure to perform resulting from
                            causes outside its reasonable control, including, but not limited to, acts of God, war, terrorism,
                            riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes or shortages
                            of transportation facilities, fuel, energy, labor, or materials, or failures of telecommunications or
                            information services infrastructure.
                        </Para>

                        <Para seperator={true} heading={"17.7. Third-Party Beneficiaries"}>
                            This Privacy Policy is for the sole benefit of you and ODW and
                            is not intended to create any third-party beneficiary rights, except as expressly provided in
                            separate agreements between ODW and its Partner Clinics.

                        </Para>

                        <Para seperator={false} heading={"17.8. Headings"}>
                            The headings in this Privacy Policy are for convenience only and have no legal or contractual effect.


                        </Para>

                    </Card>

                </View>
                <ParaBold style={[styles.para, styles.bold]}>
                    THANK YOU FOR CHOOSING ONE DENTAL WORLD. WE ARE COMMITTED TO
                    PROTECTING YOUR PRIVACY AND PROVIDING YOU WITH A SECURE AND
                    TRANSPARENT EXPERIENCE.

                </ParaBold>
            </ScrollView>
        </SafeAreaContainer>
    )
}